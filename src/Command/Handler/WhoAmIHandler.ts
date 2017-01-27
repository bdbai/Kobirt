import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import AgentQq from '../../Model/AgentQq';
import BadCommand from '../Error/BadCommand';

export default class WhoAmIHandler extends CommandHandlerBase {
    public Prefix = '我是谁';

    public async processCommand(command: Command): Promise<HandleResult> {
        const user = await AgentQq.checkUserByQq(command.Message.sender_uid);
        if (!user) throw new BadCommand('我好像不认识你诶。请先用指令绑定你的游戏 ID。', command);

        command.Message.Reply(`啊哈！你就是特工 ${user.AgentId} ！`);
        return HandleResult.Handled;
    }
}