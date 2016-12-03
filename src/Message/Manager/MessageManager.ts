import IMessage from '../IMessage';
import IMessageManager from './IMessageManager';
import IMessageHandler from '../Handler/IMessageHandler';
import HandleResult from '../Handler/HandleResult';

class MessageManager implements IMessageManager {
    constructor(private handlers: Array<IMessageHandler> = []) { }

    public HandlerRegister<T extends IMessageHandler>(
        handler: { new(): T; }
    ): void {
        this.handlers.push(new handler());
    }

    public ProcessMessage(message: IMessage): void {
        let handled = false;
        for (const handler of this.handlers) {
            const result = handler.Handle(message);
            if (result === HandleResult.Handled) {
                handled = true;
                break;
            }
        }

    }

}

export default MessageManager;