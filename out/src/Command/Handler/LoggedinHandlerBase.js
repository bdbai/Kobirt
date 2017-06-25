"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandlerBase_1 = require("./CommandHandlerBase");
const AgentQq_1 = require("../../Model/AgentQq");
const BadCommand_1 = require("../Error/BadCommand");
class LoggedinHandlerBase extends CommandHandlerBase_1.default {
    async processCommand(command) {
        const user = await AgentQq_1.default.checkUserByQq(command.Message.user_id);
        if (!user)
            throw new BadCommand_1.default('你还没绑定账户呢，请先加我为好友，然后单独给我发指令：K 绑定', command);
        return await this.processUserCommand(command, user);
    }
}
exports.default = LoggedinHandlerBase;
//# sourceMappingURL=LoggedinHandlerBase.js.map