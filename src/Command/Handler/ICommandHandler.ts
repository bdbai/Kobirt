import HandleResult from '../../Message/Handler/HandleResult';
import IMessage from '../../Message/IMessage';
import Command from '../Command';

interface ICommandHandler {
    Handle: (command: Command) => Promise<HandleResult>;
    RegisterSubHandler: (subCommandHandler: ICommandHandler) => ICommandHandler;
}

export default ICommandHandler;