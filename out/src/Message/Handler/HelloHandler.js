"use strict";
const HandleResult_1 = require('./HandleResult');
class HelloHandler {
    Handle(message) {
        if (!message.group && message.content === 'hello') {
            message.Reply('Hello World from Kobirt!');
            return HandleResult_1.default.Handled;
        }
        else {
            return HandleResult_1.default.Skipped;
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HelloHandler;
//# sourceMappingURL=HelloHandler.js.map