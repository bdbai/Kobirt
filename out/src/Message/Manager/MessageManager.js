"use strict";
const HandleResult_1 = require('../Handler/HandleResult');
class MessageManager {
    constructor(handlers = []) {
        this.handlers = handlers;
    }
    HandlerRegister(handler) {
        this.handlers.push(new handler());
    }
    ProcessMessage(message) {
        let handled = false;
        for (const handler of this.handlers) {
            const result = handler.Handle(message);
            if (result === HandleResult_1.default.Handled) {
                handled = true;
                break;
            }
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MessageManager;
//# sourceMappingURL=MessageManager.js.map