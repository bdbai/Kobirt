"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleResult_1 = require("./HandleResult");
class DisposeHandler {
    async Handle(message) {
        if (message.message_type === 'group') {
            message.Dispose();
        }
        else {
            message.Reply('有何吩咐？\r\n请说 K help 查看可用指令');
        }
        return HandleResult_1.default.Handled;
    }
}
exports.default = DisposeHandler;
//# sourceMappingURL=DisposeHandler.js.map