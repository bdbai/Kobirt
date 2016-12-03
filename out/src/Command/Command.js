"use strict";
class Command {
    constructor(Content, Message) {
        this.Content = Content;
        this.Message = Message;
    }
    getSubCommand(prefix) {
        if (prefix.startsWith(prefix)) {
            const prefixLen = prefix.length;
            return new Command(this.Content.substr(prefixLen).trim(), this.Message);
        }
        else {
            return this;
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Command;
//# sourceMappingURL=Command.js.map