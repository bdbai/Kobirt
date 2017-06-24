import IMessage from '../IMessage';
import IMessageHandler from './IMessageHandler';
import HandleResult from './HandleResult';

class HelloHandler implements IMessageHandler {
    public async Handle(message: IMessage): Promise<HandleResult> {
        if (message.message_type !== 'group' && message.message === 'hello') {
            message.Reply('Hello World from Kobirt!');
            return HandleResult.Handled;
        } else {
            return HandleResult.Skipped;
        }
    }
}

export default HelloHandler;