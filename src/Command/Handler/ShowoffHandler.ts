import LoggedinHandlerBase from './LoggedinHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import IUser from '../../Ingress/IUser';
import IMedal from '../../Ingress/IMedal';
import AgentQq from '../../Model/AgentQq';
import { loadUserFromId } from '../../Ingress/AgentStats/ShareAPI';
import BadCommand from '../Error/BadCommand';

function medalCount(level: string, medals: Array<IMedal>) {
    return medals.filter(i => i.CurrentLevel === level).length;
}

export default class ShowoffHandler extends LoggedinHandlerBase {
    public Prefix = '得瑟';

    public async processUserCommand(command: Command, user: AgentQq): Promise<HandleResult> {
        let agent: IUser;
        try {
            agent = await loadUserFromId(user.AgentId);
            const title = agent.Level > 9 ? '大佬' : '特工';
            const ms = agent.Medals;
            command.Message.Reply(`${title} ${agent.AgentId} 当前 ${agent.Level} 级，共有勋章 ${medalCount('bronze', ms)} 铜，${medalCount('silver', ms)} 银，${medalCount('gold', ms)} 金， ${medalCount('platinum', ms)} 白金， ${medalCount('black', ms)} 黑。\r\n
包含部分不再颁发的勋章。`);
        } catch (err) {
            this.handleError(err, command);
        }

        return HandleResult.Handled;
    }
}