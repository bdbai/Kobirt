import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import AgentQq from '../../Model/AgentQq';
import BadCommand from '../Error/BadCommand';

export default class UnbindHandler extends CommandHandlerBase {
    public Prefix = '注销';

    public async processCommand(command: Command): Promise<HandleResult> {
        const userByQQ = await AgentQq.checkUserByQq(command.Message.sender_uid);
        if (!userByQQ) throw new BadCommand('你还没绑定呢', command);

        await userByQQ.unbind();
        command.Message.Reply('再见QAQ\r\n记得到 AgentStats 网站取消分享哦~');
        return HandleResult.Handled;
    }
}
