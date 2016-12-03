import IMessage from '../IMessage';
import IMessageHandler from './IMessageHandler';
import HandleResult from './HandleResult';

class DisposeHandler implements IMessageHandler {
    public Handle(message: IMessage): HandleResult {
        message.Dispose();
        return HandleResult.Handled;
    }
}

export default DisposeHandler;