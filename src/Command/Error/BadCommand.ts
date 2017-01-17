import Command from '../Command';

export default class BadCommand extends Error {
    constructor(msg: string, public Command: Command) {
        super(msg);
    }
}