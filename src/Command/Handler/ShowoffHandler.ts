import LoggedinHandlerBase from './LoggedinHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import IUser from '../../Ingress/IUser';
import IMedal from '../../Ingress/IMedal';
import AgentQq from '../../Model/AgentQq';
import { loadUserFromId } from '../../Ingress/AgentStats/ShareAPI';
import BadCommand from '../Error/BadCommand';

export default class ShowoffHandler extends LoggedinHandlerBase {
    public Prefix = '得瑟';

    public async processUserCommand(command: Command, user: AgentQq): Promise<HandleResult> {
        const agent = await loadUserFromId(user.AgentId);
        const title = agent.Level > 9 ? '大佬' : '特工';
        command.Message.Reply(
            `${title} ${agent.AgentId} 当前 ${agent.Level} 级，共有勋章 ` +
            `${agent.CountMedals('bronze')} 铜，` +
            `${agent.CountMedals('silver')} 银，` +
            `${agent.CountMedals('gold')} 金，` +
            `${agent.CountMedals('platinum')} 铂，` +
            `${agent.CountMedals('black')} 黑。`);

        return HandleResult.Handled;
    }
}