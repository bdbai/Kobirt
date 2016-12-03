"use strict";
const HandleResult_1 = require('./HandleResult');
class DisposeHandler {
    Handle(message) {
        message.Dispose();
        return HandleResult_1.default.Handled;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DisposeHandler;
//# sourceMappingURL=DisposeHandler.js.map