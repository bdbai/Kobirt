"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BadCommand extends Error {
    constructor(msg, Command) {
        super(msg);
        this.Command = Command;
    }
}
exports.default = BadCommand;
//# sourceMappingURL=BadCommand.js.map