import IMessage from '../Message/IMessage';

class Command {
    constructor(
        public Content: string,
        public Message: IMessage,
        public AccumulatedPrefixes = []
    ) { }

    public GetSubCommand(prefix: string) {
        if (this.Content.startsWith(prefix)) {
            const prefixLen = prefix.length;
            return new Command(
                this.Content.substr(prefixLen).trim(),
                this.Message,
                [ ...this.AccumulatedPrefixes, this.Content.substr(0, prefixLen) ]
            );
        } else {
            return this;
        }
    }
    public GetAccumulatedPrefix() {
        return this.AccumulatedPrefixes.join(' ');
    }
}

export default Command;