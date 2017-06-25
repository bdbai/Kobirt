"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandlerBase_1 = require("./CommandHandlerBase");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
const AgentQq_1 = require("../../Model/AgentQq");
const BadCommand_1 = require("../Error/BadCommand");
class UnbindHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '注销';
    }
    async processCommand(command) {
        const userByQQ = await AgentQq_1.default.checkUserByQq(command.Message.user_id);
        if (!userByQQ)
            throw new BadCommand_1.default('你还没绑定呢', command);
        await userByQQ.unbind();
        command.Message.Reply('再见QAQ\r\n记得到 AgentStats 网站取消分享哦~');
        return HandleResult_1.default.Handled;
    }
}
exports.default = UnbindHandler;
//# sourceMappingURL=UnbindHandler.js.map