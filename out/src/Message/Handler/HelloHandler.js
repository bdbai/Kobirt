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
class HelloHandler {
    Handle(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.group && message.content === 'hello') {
                message.Reply('Hello World from Kobirt!');
                return HandleResult_1.default.Handled;
            }
            else {
                return HandleResult_1.default.Skipped;
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HelloHandler;
//# sourceMappingURL=HelloHandler.js.map