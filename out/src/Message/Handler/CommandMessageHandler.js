"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Command_1 = require("../../Command/Command");
class CommandMessageHandler {
    constructor(handler) {
        this.handler = handler;
    }
    Handle(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new Command_1.default(message.content, message);
            return this.handler.Handle(command);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommandMessageHandler;
//# sourceMappingURL=CommandMessageHandler.js.map