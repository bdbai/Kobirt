import IMessage from '../IMessage';
import IMessageHandler from './IMessageHandler';
import HandleResult from './HandleResult';

class DisposeHandler implements IMessageHandler {
    public async Handle(message: IMessage): Promise<HandleResult> {
        if (message.message_type === 'group') {
            message.Dispose();
        } else {
            message.Reply('有何吩咐？\r\n请说 K help 查看可用指令');
        }
        return HandleResult.Handled;
    }
}

export default DisposeHandler;