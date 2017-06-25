"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    GetCurrentContent(prefix = []) {
        if (prefix.length === 0) {
            return this.Content.split(' ')[0];
        }
        else {
            return prefix.find(i => this.StartsWith(i));
        }
    }
    GetAccumulatedPrefix() {
        return this.AccumulatedPrefixes.join(' ');
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map