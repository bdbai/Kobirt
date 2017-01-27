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
const ShareAPI_1 = require("../../Ingress/AgentStats/ShareAPI");
const AgentQq_1 = require("../../Model/AgentQq");
const BadCommand_1 = require("../Error/BadCommand");
class BindHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '绑定';
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = command.GetSubCommand(this.Prefix).Content;
            if (id === '') {
                command.Message.Reply(`绑定只需两步：
1. 登录 www.agent-stats.com，在“我的共享列表”中将个人资料分享给 Kobirt
2. 给我发指令 ${command.GetAccumulatedPrefix()} ${this.Prefix} 加你的 ID`);
                return HandleResult_1.default.Handled;
            }
            const userByQQ = yield AgentQq_1.default.checkUserByQq(command.Message.sender_uid);
            if (userByQQ)
                throw new BadCommand_1.default('已经绑定过了哟', command);
            const userById = yield AgentQq_1.default.checkUserByAgentId(id);
            if (userById)
                throw new BadCommand_1.default('不行哦~', command);
            const knownUsers = yield ShareAPI_1.fetchShareFromList();
            if (!knownUsers.find(i => i === id))
                throw new BadCommand_1.default('我好像找不到你诶。你把 AgentStats 资料分享给 Kobirt 了吗？', command);
            const agentQq = yield AgentQq_1.default.bindUserByQq(command.Message.sender_uid, id);
            command.Message.Reply('绑定完成！接下来请到群中发指令 K 诶嘿 参与该群特工排行榜');
            return HandleResult_1.default.Handled;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BindHandler;
//# sourceMappingURL=BindHandler.js.map