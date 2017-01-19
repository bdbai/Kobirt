import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import AgentQq from '../../Model/AgentQq';
import BadCommand from '../Error/BadCommand';

abstract class LoggedinHandlerBase extends CommandHandlerBase {
    protected abstract async processUserCommand(command: Command, user): Promise<HandleResult>;

    async processCommand(command: Command) {
        const user = await AgentQq.checkUserByQq(command.Message.sender_uid);
        if (!user) throw new BadCommand('你还没绑定账户呢，请给加我为好友，发私信 K 账户 绑定', command);

        return await this.processUserCommand(command, user);
    }
}

export default LoggedinHandlerBase;