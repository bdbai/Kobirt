import IMessage from '../IMessage';
import HandleResult from './HandleResult';

interface IMessageHandler {
    Handle(message: IMessage): HandleResult;
}

export default IMessageHandler;