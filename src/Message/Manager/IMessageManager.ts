import IMessage from '../IMessage';
import IMessageHandler from '../Handler/IMessageHandler';

interface IMessageManager {
    HandlerRegister<T extends IMessageHandler>(handler: { new(): T; }): void;
    ProcessMessage(message: IMessage): void;
}

export default IMessageManager;