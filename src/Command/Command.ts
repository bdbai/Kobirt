import IMessage from '../Message/IMessage';

export default class Command {
    constructor(
        public Content: string,
        public Message: IMessage,
        public AccumulatedPrefixes = []
    ) { }

    public StartsWith(prefix: string) {
        return this.Content.toLowerCase().startsWith(prefix.toLowerCase());
    }

    public GetSubCommand(prefix: string) {
        if (this.StartsWith(prefix)) {
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