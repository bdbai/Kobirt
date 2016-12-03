import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';

class CommandHandler extends CommandHandlerBase {
    constructor(public Prefix: string) {
        super();
    };
}

export default CommandHandler;