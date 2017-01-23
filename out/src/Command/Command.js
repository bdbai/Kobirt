"use strict";
class Command {
    constructor(Content, Message, AccumulatedPrefixes = []) {
        this.Content = Content;
        this.Message = Message;
        this.AccumulatedPrefixes = AccumulatedPrefixes;
    }
    StartsWith(prefix) {
        return this.Content.toLowerCase().startsWith(prefix.toLowerCase());
    }
    GetSubCommand(prefix) {
        if (this.StartsWith(prefix)) {
            const prefixLen = prefix.length;
            return new Command(this.Content.substr(prefixLen).trim(), this.Message, [...this.AccumulatedPrefixes, this.Content.substr(0, prefixLen)]);
        }
        else {
            return this;
        }
    }
    GetCurrentContent() {
        return this.Content.split(' ')[0];
    }
    GetAccumulatedPrefix() {
        return this.AccumulatedPrefixes.join(' ');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Command;
//# sourceMappingURL=Command.js.map