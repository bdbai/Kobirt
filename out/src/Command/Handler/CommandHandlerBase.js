"use strict";
const HandleResult_1 = require('../../Message/Handler/HandleResult');
class CommandHandlerBase {
    constructor() {
        this._subCommandHandlers = Array();
        this.Prefix = '';
        this.accepted = (command) => command.Content.startsWith(this.Prefix);
    }
    processCommand(command) {
        return HandleResult_1.default.Skipped;
    }
    Handle(command) {
        if (!this.accepted(command)) {
            return HandleResult_1.default.Skipped;
        }
        const subCommand = command.getSubCommand(this.Prefix);
        let changed = false;
        for (const subHandler of this._subCommandHandlers) {
            switch (subHandler.Handle(subCommand)) {
                case HandleResult_1.default.Changed:
                    changed = true;
                    break;
                case HandleResult_1.default.Handled:
                    return HandleResult_1.default.Handled;
            }
        }
        changed = this.processCommand(command) === HandleResult_1.default.Changed || changed;
        return changed ? HandleResult_1.default.Changed : HandleResult_1.default.Handled;
    }
    RegisterSubHandler(subCommand) {
        this._subCommandHandlers.unshift(subCommand);
        return this;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommandHandlerBase;
//# sourceMappingURL=CommandHandlerBase.js.map