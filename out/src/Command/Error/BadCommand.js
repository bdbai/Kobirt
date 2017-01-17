"use strict";
class BadCommand extends Error {
    constructor(msg, Command) {
        super(msg);
        this.Command = Command;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BadCommand;
//# sourceMappingURL=BadCommand.js.map