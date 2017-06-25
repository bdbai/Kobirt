import IMessage from '../IMessage';
import IMessageHandler from './IMessageHandler';
import HandleResult from './HandleResult';

import Command from '../../Command/Command';
import ICommandHandler from '../../Command/Handler/ICommandHandler';

class CommandMessageHandler implements IMessageHandler {
    constructor(private handler: ICommandHandler) { }

    public async Handle(message: IMessage): Promise<HandleResult> {
        const command = new Command(message.message.trim(), message);
        return this.handler.Handle(command);
    }
}

export default CommandMessageHandler;