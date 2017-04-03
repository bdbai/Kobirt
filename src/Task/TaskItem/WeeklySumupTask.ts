import ITask from '../ITask';
import AgentQq from '../../Model/AgentQq';
import QqGroup from '../../Model/QqGroup';
import IUser from '../../Ingress/IUser';
import IMedal from '../../Ingress/IMedal';
import { loadUserFromId } from '../../Ingress/AgentStats/ShareAPI';
import { SendGroupMessage } from '../../Webqq/API';

interface ExportedData {
    name: string,
    data?: {
        isLazy: boolean,
        weekAp: number,
        weekMu: number
    },
    error?: string
}

export default class WeeklySumupTask implements ITask {
    public Name = '每周统计';
    public Pattern = '0 0 21 * * 0';

    private async processAgentQq(qq: AgentQq): Promise<ExportedData> {
        let agent: IUser;
        try {
            agent = await loadUserFromId(qq.AgentId);
        } catch (err) {
            console.log(err);
            return {
                name: qq.AgentId,
                error: err.toString()
            };
        }

        const ap = agent.Medals.find(i => i.name === 'ap');
        const mu = agent.Medals.find(i => i.name === 'illuminator');

        if (qq.LastAp === ap.progression.total) {
            // Lazy guy
            return {
                name: qq.AgentId,
                data: {
                    isLazy: true,
                    weekAp: 0,
                    weekMu: 0
                }
            };
        } else {
            const ret: ExportedData = {
                name: agent.AgentId,
                data: {
                    isLazy: false,
                    weekAp: ap.progression.total - qq.LastAp,
                    weekMu: mu.progression.total - qq.LastMu
                }
            };
            qq.LastAp = ap.progression.total;
            qq.LastMu = mu.progression.total;
            qq.save();

            return ret;
        }
    }

    private async processGroup(
        groupUid: string,
        qqs: Array<AgentQq>,
        agents: Map<string, Promise<ExportedData>>) {

        const data = Array<ExportedData>();
        for (const qq of qqs) {
            data.push(await agents.get(qq.AgentId));
        }
        const errorguys = data.filter(i => i.error);
        const lazyguys = data.filter(i => i.data && i.data.isLazy);
        const normalguys = data.filter(i => i.data && !i.data.isLazy);

        let message = '';
        // AP
        normalguys.sort((a, b) => b.data.weekAp - a.data.weekAp);
        message += '本周特工 AP 排行榜：\n' +
            normalguys.map(i => `@${i.name} ${i.data.weekAp}`).join('\n');

        // MU
        normalguys.sort((a, b) => b.data.weekMu - a.data.weekMu);
        message += '\n\n本周特工 MU 排行榜：\n' +
            normalguys.map(i => `@${i.name} ${i.data.weekMu}`).join('\n');

        // Lazy guys!
        if (lazyguys.length > 0) {
            message += '\n\n以下特工未及时上传数据，不参与排名：\n' +
                lazyguys.map(i => `@${i.name}`).join('\n');
        }

        // Error guys!
        if (errorguys.length > 0) {
            message += '\n\n以下特工不幸翻车：\n' + 
                errorguys.map(i => `@${i.name} ${i.error}`).join('\n');
        }

        message += '\n\nNaN 表示第一次参与排行榜\n排行榜仅供娱乐';
        SendGroupMessage(groupUid, message);
    }

    public async DoWork() {
        // 群
        let groups = new Map<string, Array<AgentQq>>();
        const qqs = AgentQq.fetchAllAgentQqs();
        const qqGroups = QqGroup.fetchAllAgentQqs();
        // 异步获取所有特工信息
        const agents = new Map<string, Promise<ExportedData>>(
            (await qqs).map(agentQq => [agentQq.AgentId, this.processAgentQq(agentQq)] as
                [string, Promise<ExportedData>])
        );
        // 把用户分类进群
        (await qqGroups).forEach(q => groups.set(q.Group, []));
        (await qqGroups).forEach(q => groups.get(q.Group).push(q.Qq));

        Array.from(groups.keys())
            .forEach(i => this.processGroup(i, groups.get(i), agents));
    }
}