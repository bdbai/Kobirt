"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelpHandler_1 = require("./HelpHandler");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
class CommandHandler extends HelpHandler_1.default {
    constructor(Prefix) {
        super();
        this.Prefix = Prefix;
    }
    async processCommand(command) {
        command.AccumulatedPrefixes.push(this.Prefix);
        if (command.Message.message_type === 'group' &&
            command.GetSubCommand(this.Prefix).Content.length > 0)
            return HandleResult_1.default.Skipped;
        return await super.processCommand(command);
    }
}
exports.default = CommandHandler;
//# sourceMappingURL=CommandHandler.js.map