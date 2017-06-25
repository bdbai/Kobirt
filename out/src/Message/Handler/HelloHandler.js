"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleResult_1 = require("./HandleResult");
class HelloHandler {
    async Handle(message) {
        if (message.message_type !== 'group' && message.message === 'hello') {
            message.Reply('Hello World from Kobirt!');
            return HandleResult_1.default.Handled;
        }
        else {
            return HandleResult_1.default.Skipped;
        }
    }
}
exports.default = HelloHandler;
//# sourceMappingURL=HelloHandler.js.map