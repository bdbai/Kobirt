"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandlerBase_1 = require("./CommandHandlerBase");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
const AgentQq_1 = require("../../Model/AgentQq");
const BadCommand_1 = require("../Error/BadCommand");
class WhoAmIHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '我是谁';
    }
    async processCommand(command) {
        const user = await AgentQq_1.default.checkUserByQq(command.Message.user_id);
        if (!user)
            throw new BadCommand_1.default('我好像不认识你诶。请先用指令绑定你的游戏 ID。', command);
        command.Message.Reply(`啊哈！你就是特工 ${user.AgentId} ！`);
        return HandleResult_1.default.Handled;
    }
}
exports.default = WhoAmIHandler;
//# sourceMappingURL=WhoAmIHandler.js.map