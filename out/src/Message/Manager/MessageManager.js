"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const HandleResult_1 = require("../Handler/HandleResult");
class MessageManager {
    constructor(eventDispatcher, handlers = []) {
        this.eventDispatcher = eventDispatcher;
        this.handlers = handlers;
    }
    HandlerRegister(handler) {
        this.handlers.push(new handler());
    }
    ProcessMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (message.post_type) {
                case 'send':
                    message.Dispose();
                    break;
                case 'recv':
                    let handled = false;
                    for (const handler of this.handlers) {
                        const result = yield handler.Handle(message);
                        if (result === HandleResult_1.default.Handled) {
                            handled = true;
                            break;
                        }
                    }
                    break;
                case 'event':
                    this.eventDispatcher(message);
                    break;
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MessageManager;
//# sourceMappingURL=MessageManager.js.map