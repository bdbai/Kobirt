"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CommandHandlerBase_1 = require("./CommandHandlerBase");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
class HelpHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = 'help';
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const aprefix = command.GetAccumulatedPrefix();
            if (command.Message.group) {
                command.Message.Reply(`Hello! 我是 Kobirt。请用指令告诉我您想做什么：
${aprefix} help - 输出这条信息
`);
            }
            else {
                command.Message.Reply(`Kobirt 命令列表:
${aprefix} help - 输出这条消息
${aprefix} 账户 - 有关 Ingress 和 AgentStats 的绑定、查询等`);
            }
            return HandleResult_1.default.Handled;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HelpHandler;
//# sourceMappingURL=HelpHandler.js.map