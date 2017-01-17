import ICommandHandler from './ICommandHandler';
import HandleResult from '../../Message/Handler/HandleResult';
import IMessage from '../../Message/IMessage';
import Command from '../Command';
import BadCommand from '../Error/BadCommand';

abstract class CommandHandlerBase implements ICommandHandler {
    private _subCommandHandlers = Array<ICommandHandler>();

    abstract Prefix = '';

    protected accepted = (command: Command) => command.StartsWith(this.Prefix);

    protected async handleError(err: Error, command: Command): Promise<HandleResult> {
        if (err.constructor.name === BadCommand.name) {
            command.Message.Reply(err.message);
        } else {
            command.Message.Reply(`出了点小问题\r\n${err.message}`);
        }
        console.error(err);
        return HandleResult.Handled;
    }

    protected async processCommand(command: Command): Promise<HandleResult> {
        return HandleResult.Skipped;
    }

    public async Handle(command: Command): Promise<HandleResult> {
        if (!this.accepted(command)) {
            return HandleResult.Skipped;
        }

        const subCommand = command.GetSubCommand(this.Prefix);
        let changed = false;
        for (const subHandler of this._subCommandHandlers) {
            switch (await subHandler.Handle(subCommand)) {
                case HandleResult.Changed:
                    changed = true;
                    break;
                case HandleResult.Handled:
                    return HandleResult.Handled;
            }
        }

        changed = await this.processCommand(command) === HandleResult.Changed || changed;

        return changed ? HandleResult.Changed : HandleResult.Handled;
    }

    public RegisterSubHandler(subCommand: ICommandHandler): ICommandHandler {
        this._subCommandHandlers.unshift(subCommand);
        return this;
    }
}

export default CommandHandlerBase;