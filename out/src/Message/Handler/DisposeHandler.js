"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const HandleResult_1 = require("./HandleResult");
class DisposeHandler {
    Handle(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.group) {
                message.Dispose();
            }
            else {
                message.Reply('有何吩咐？\r\n请说 K help 查看可用指令');
            }
            return HandleResult_1.default.Handled;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DisposeHandler;
//# sourceMappingURL=DisposeHandler.js.map