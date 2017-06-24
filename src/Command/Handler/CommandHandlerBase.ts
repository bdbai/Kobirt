import ICommandHandler from './ICommandHandler';
import HandleResult from '../../Message/Handler/HandleResult';
import IMessage from '../../Message/IMessage';
import Command from '../Command';
import BadCommand from '../Error/BadCommand';

abstract class CommandHandlerBase implements ICommandHandler {
    private _subCommandHandlers = Array<ICommandHandler>();

    protected Prefix: string | Array<string> = '';

    protected acceptGroupMessage: boolean = true;

    protected acceptFriendMessage: boolean = true;

    protected accepted = (command: Command) =>
        (
            (command.Message.message_type === 'private' && this.acceptFriendMessage) ||
            (command.Message.message_type === 'group' && this.acceptGroupMessage)
        ) && (
            typeof this.Prefix === 'string' ?
            command.StartsWith(this.Prefix) :
            this.Prefix instanceof Array ?
                !!this.Prefix.find(i => command.StartsWith(i)) :
                false
        );

    protected async handleError(err: Error, command: Command): Promise<HandleResult> {
        if (err instanceof BadCommand) {
            command.Message.Reply(err.message || 'WTF?');
            console.log(err);
        } else {
            command.Message.Reply(`出了点小问题\r\n${err.message}`);
            console.error(err);
        }
        return HandleResult.Handled;
    }

    protected async processCommand(command: Command): Promise<HandleResult> {
        return HandleResult.Skipped;
    }

    public async Handle(command: Command): Promise<HandleResult> {
        if (!this.accepted(command)) {
            return HandleResult.Skipped;
        }

        const subCommand = command.GetSubCommand(
            typeof this.Prefix === 'string' ?
                this.Prefix :
                this.Prefix instanceof Array ?
                    this.Prefix.find(i => command.StartsWith(i)):
                    '');

        let changed = false;
        for (const subHandler of this._subCommandHandlers) {
            let result: HandleResult;
            try {
                result = await subHandler.Handle(subCommand);
            } catch (err) {
                this.handleError(err, subCommand);
                return HandleResult.Handled;
            }
            switch (result) {
                case HandleResult.Changed:
                    changed = true;
                    break;
                case HandleResult.Handled:
                    return HandleResult.Handled;
            }
        }

        const handleResult = await this.processCommand(command);

        if (handleResult === HandleResult.Skipped && changed) {
            return HandleResult.Changed;
        } else {
            return handleResult;
        }
    }

    public RegisterSubHandler(subCommand: ICommandHandler): ICommandHandler {
        this._subCommandHandlers.push(subCommand);
        return this;
    }
}

export default CommandHandlerBase;