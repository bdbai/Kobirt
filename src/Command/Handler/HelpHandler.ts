import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';

class HelpHandler extends CommandHandlerBase {
    public Prefix = 'help';

    public processCommand(command: Command): HandleResult {
        command.Message.Reply(
`Kobirt 命令列表:
K help - 获取帮助`
        );
        return HandleResult.Handled;
    }
}

export default HelpHandler;