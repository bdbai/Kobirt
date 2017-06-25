"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleResult_1 = require("../Handler/HandleResult");
class MessageManager {
    constructor(eventDispatcher, handlers = []) {
        this.eventDispatcher = eventDispatcher;
        this.handlers = handlers;
    }
    HandlerRegister(handler) {
        this.handlers.push(new handler());
    }
    async ProcessMessage(message) {
        let handled = false;
        for (const handler of this.handlers) {
            const result = await handler.Handle(message);
            if (result === HandleResult_1.default.Handled) {
                handled = true;
                break;
            }
        }
        // this.eventDispatcher(message);
    }
}
exports.default = MessageManager;
//# sourceMappingURL=MessageManager.js.map