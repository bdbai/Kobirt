import IMessage from '../IMessage';
import IMessageManager from './IMessageManager';
import IMessageHandler from '../Handler/IMessageHandler';
import HandleResult from '../Handler/HandleResult';
import IEventDispatcher from '../../Event/IEventDispatcher';

class MessageManager implements IMessageManager {
    constructor(
        private eventDispatcher: IEventDispatcher,
        private handlers: Array<IMessageHandler> = []
    ) { }

    public HandlerRegister<T extends IMessageHandler>(
        handler: { new (): T; }
    ): void {
        this.handlers.push(new handler());
    }

    public async ProcessMessage(message: IMessage): Promise<void> {
        switch (message.post_type) {
            case 'send':
                message.Dispose();
                break;
            case 'recv':
                let handled = false;
                for (const handler of this.handlers) {
                    const result = await handler.Handle(message);
                    if (result === HandleResult.Handled) {
                        handled = true;
                        break;
                    }
                }
                break;
            case 'event':
                this.eventDispatcher(message);
                break;
        }
    }

}

export default MessageManager;