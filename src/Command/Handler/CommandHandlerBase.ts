import ICommandHandler from './ICommandHandler';
import HandleResult from '../../Message/Handler/HandleResult';
import IMessage from '../../Message/IMessage';
import Command from '../Command';

abstract class CommandHandlerBase implements ICommandHandler {
    private _subCommandHandlers = Array<ICommandHandler>();

    abstract Prefix = '';

    protected accepted = (command: Command) => command.Content.startsWith(this.Prefix);

    protected processCommand(command: Command): HandleResult {
        return HandleResult.Skipped;
    }

    public Handle(command: Command): HandleResult {
        if (!this.accepted(command)) {
            return HandleResult.Skipped;
        }

        const subCommand = command.getSubCommand(this.Prefix);
        let changed = false;
        for (const subHandler of this._subCommandHandlers) {
            switch (subHandler.Handle(subCommand)) {
                case HandleResult.Changed:
                    changed = true;
                    break;
                case HandleResult.Handled:
                    return HandleResult.Handled;
            }
        }

        changed = this.processCommand(command) === HandleResult.Changed || changed;

        return changed ? HandleResult.Changed : HandleResult.Handled;
    }

    public RegisterSubHandler(subCommand: ICommandHandler): ICommandHandler {
        this._subCommandHandlers.unshift(subCommand);
        return this;
    }
}

export default CommandHandlerBase;