"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Command/Command");
class CommandMessageHandler {
    constructor(handler) {
        this.handler = handler;
    }
    async Handle(message) {
        const command = new Command_1.default(message.message.trim(), message);
        return this.handler.Handle(command);
    }
}
exports.default = CommandMessageHandler;
//# sourceMappingURL=CommandMessageHandler.js.map