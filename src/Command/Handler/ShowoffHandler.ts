import LoggedinHandlerBase from './LoggedinHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import IUser from '../../Ingress/IUser';
import IMedal from '../../Ingress/IMedal';
import AgentQq from '../../Model/AgentQq';
import { loadUserFromId } from '../../Ingress/AgentStats/ShareAPI';
import BadCommand from '../Error/BadCommand';

export default class ShowoffHandler extends LoggedinHandlerBase {
    public Prefix = [ '得瑟', '嘚瑟' ];

    public async processUserCommand(command: Command, user: AgentQq): Promise<HandleResult> {
        const agent = await loadUserFromId(user.AgentId);

        if (isNaN(agent.Level)) {
            command.Message.Reply(`${agent.AgentId} 还没有上传数据哦~
请到 www.agent-stats.com 下载应用并上传特工信息`);
            return HandleResult.Handled;
        }

        const apMedal = agent.Medals.find(i => i.name === 'ap');
        const muMedal = agent.Medals.find(i => i.name === 'illuminator');

        const title = agent.Level > 9 ? '大佬' : '特工';
        command.Message.Reply(
            `${agent.Level} 级${title} ${agent.AgentId}
本次/每周/每月/总计
AP ${apMedal.progression.latest}/${apMedal.progression.week}/${apMedal.progression.month}/${apMedal.progression.total}
MU ${muMedal.progression.latest}/${muMedal.progression.week}/${muMedal.progression.month}/${muMedal.progression.total}
共有勋章 ` +
            `${agent.CountMedals('bronze')} 铜 ` +
            `${agent.CountMedals('silver')} 银 ` +
            `${agent.CountMedals('gold')} 金 ` +
            `${agent.CountMedals('platinum')} 铂 ` +
            `${agent.CountMedals('black')} 黑
以上数据仅供娱乐`);

        return HandleResult.Handled;
    }
}