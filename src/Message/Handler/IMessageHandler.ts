import IMessage from '../IMessage';
import HandleResult from './HandleResult';

interface IMessageHandler {
    Handle(message: IMessage): Promise<HandleResult>;
}

export default IMessageHandler;