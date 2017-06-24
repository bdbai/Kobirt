import HelpHandler from './HelpHandler';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';

export default class CommandHandler extends HelpHandler {
    constructor(public Prefix: string) {
        super();
    }

    public async processCommand(command: Command): Promise<HandleResult> {
        command.AccumulatedPrefixes.push(this.Prefix);

        if (
            command.Message.message_type === 'group' &&
            command.GetSubCommand(this.Prefix).Content.length > 0
        ) return HandleResult.Skipped;
        return await super.processCommand(command);
    }
}