"use strict";
class Command {
    constructor() {
        this._subCommandHandlers = Array();
        this.prefix = '';
    }
    handle(command, message) {
        //const subCommand = command.startsWith()
        for (const subCommand of this._subCommandHandlers) {
        }
    }
    registerSubCommandHandler(subCommand) {
        this._subCommandHandlers.push(subCommand);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Command;
//# sourceMappingURL=CommandBase.js.map