import IMessage from '../Message/IMessage';

class Command {
    constructor(public Content: string, public Message: IMessage) { }

    public getSubCommand(prefix: string) {
        if (prefix.startsWith(prefix)) {
            const prefixLen = prefix.length;
            return new Command(this.Content.substr(prefixLen).trim(), this.Message);
        } else {
            return this; 
        }
    }
}

export default Command;