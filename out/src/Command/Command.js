"use strict";
class Command {
    constructor(Content, Message, AccumulatedPrefixes = []) {
        this.Content = Content;
        this.Message = Message;
        this.AccumulatedPrefixes = AccumulatedPrefixes;
    }
    GetSubCommand(prefix) {
        if (this.Content.startsWith(prefix)) {
            const prefixLen = prefix.length;
            return new Command(this.Content.substr(prefixLen).trim(), this.Message, [...this.AccumulatedPrefixes, this.Content.substr(0, prefixLen)]);
        }
        else {
            return this;
        }
    }
    GetAccumulatedPrefix() {
        return this.AccumulatedPrefixes.join(' ');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Command;
//# sourceMappingURL=Command.js.map