"use strict";
const CommandHandlerBase_1 = require('./CommandHandlerBase');
const HandleResult_1 = require('../../Message/Handler/HandleResult');
class HelpHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = 'help';
    }
    processCommand(command) {
        command.Message.Reply(`Kobirt 命令列表:
K help - 获取帮助`);
        return HandleResult_1.default.Handled;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HelpHandler;
//# sourceMappingURL=HelpHandler.js.map