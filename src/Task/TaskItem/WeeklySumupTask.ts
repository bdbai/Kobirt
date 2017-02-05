import ITask from '../ITask';
import AgentQq from '../../Model/AgentQq';
import QqGroup from '../../Model/QqGroup';
import IUser from '../../Ingress/IUser';
import IMedal from '../../Ingress/IMedal';
import { loadUserFromId } from '../../Ingress/AgentStats/ShareAPI';
import { SendGroupMessage } from '../../Webqq/API';

interface ExportedData {
    name: string,
    data: {
        weekAp: number,
        weekMu: number
    }
}

export default class WeeklySumupTask implements ITask {
    public Name = '每周统计';
    public Pattern = '0 0 21 * * 0';

    private async processGroup(
        groupUid: string,
        qqs: Array<AgentQq>,
        agents: Map<string, Promise<IUser>>) {

        const data = Array<ExportedData>();
        for (const qq of qqs) {
            let agent: IUser;
            try {
                agent = await agents.get(qq.AgentId);
            } catch (err) {
                console.log(err);
                continue;
            }
            const ap = agent.Medals.find(i => i.name === 'ap');
            const mu = agent.Medals.find(i => i.name === 'illuminator');
            data.push({
                name: agent.AgentId,
                data: {
                    weekAp: ap.progression.week,
                    weekMu: mu.progression.week
            }});
        }

        let message = '';
        // AP
        data.sort((a, b) => b.data.weekAp - a.data.weekAp);
        message += '本周特工ap排行榜：\n' +
            data.map(i => `@${i.name} ${i.data.weekAp}`).join('\n');

        message += '\n\n';

        // MU
        data.sort((a, b) => b.data.weekMu - a.data.weekMu);
        message += '本周特工mu排行榜：\n' +
            data.map(i => `@${i.name} ${i.data.weekMu}`).join('\n');

        message += '\n\n排行榜仅供娱乐';
        SendGroupMessage(groupUid, message);
    }

    public async DoWork() {
        // 所有特工信息
        const agents = new Map<string, Promise<IUser>>();
        // 群
        const groups = new Map<string, Array<AgentQq>>();
        const qqGroups = await QqGroup.fetchAllAgentQqs();

        for (const qqGroup of qqGroups) {
            // 把用户分类进群
            const group = groups.get(qqGroup.Group);
            if (!group) {
                groups.set(qqGroup.Group, [qqGroup.Qq]);
            } else {
                group.push(qqGroup.Qq);
            }

            // 异步获取特工信息（并发）
            if (!agents.has(qqGroup.Qq.AgentId)) {
                agents.set(qqGroup.Qq.AgentId, loadUserFromId(qqGroup.Qq.AgentId));
            }
        }

        Array.from(groups.keys())
            .forEach(i => this.processGroup(i, groups.get(i), agents));
    }
}