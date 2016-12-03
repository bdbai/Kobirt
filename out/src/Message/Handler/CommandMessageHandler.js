"use strict";
const Command_1 = require('../../Command/Command');
class CommandMessageHandler {
    constructor(handler) {
        this.handler = handler;
    }
    Handle(message) {
        const command = new Command_1.default(message.content, message);
        return this.handler.Handle(command);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommandMessageHandler;
//# sourceMappingURL=CommandMessageHandler.js.map