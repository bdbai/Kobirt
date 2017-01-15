import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import IUser from '../../Ingress/IUser';
import IMedal from '../../Ingress/IMedal';
import AgentQq from '../../Ingress/AgentStats/AgentQq';
import { loadUserFromId } from '../../Ingress/AgentStats/ShareAPI';

function medalCount(level: string, medals: Array<IMedal>) {
    return medals.filter(i => i.CurrentLevel === level).length;
}

class ShowoffHandler extends CommandHandlerBase {
    public Prefix = '得瑟';

    public async processCommand(command: Command): Promise<HandleResult> {
        let agent: IUser;
        try {
            const user = await AgentQq.checkUserByQq(command.Message.sender_uid);
            if (!user) throw new Error('你还没绑定账户呢，请给我发私信 K 账户 绑定');
            agent = await loadUserFromId(user.AgentId);

            const title = agent.Level > 9 ? '大佬' : '特工';
            const ms = agent.Medals;
            command.Message.Reply(`${title} ${agent.AgentId} 当前 ${agent.Level} 级，共有勋章 ${medalCount('bronze', ms)} 铜，${medalCount('silver', ms)} 银，${medalCount('gold', ms)} 金， ${medalCount('platinum', ms)} 白金， ${medalCount('black', ms)} 黑。\r\n
包含部分不再颁发的勋章。`);
        } catch (err) {
            command.Message.Reply('啊哦~\r\n' + err.message);
            console.log(err);
        }

        return HandleResult.Handled;
    }
}

export default ShowoffHandler;