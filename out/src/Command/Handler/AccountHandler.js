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
const AgentQq_1 = require("../../Ingress/AgentStats/AgentQq");
class WhoAmIHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '我是谁';
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield AgentQq_1.default.checkUserByQq(command.Message.sender_uid);
                if (user) {
                    command.Message.Reply(`啊哈！你就是特工 ${user.AgentId} ！`);
                }
                else {
                    command.Message.Reply('我好像不认识你诶。请先用指令绑定你的游戏 ID。');
                }
            }
            catch (err) {
                command.Message.Reply('出了点问题。\r\n' + err.message.toString());
                console.log(err);
            }
            return HandleResult_1.default.Handled;
        });
    }
}
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
1. 登录 agent-stats.com，将个人资料分享给 Kobirt
2. 给我发指令 ${command.GetAccumulatedPrefix()} ${this.Prefix} 加你的 ID`);
                return HandleResult_1.default.Handled;
            }
            try {
                const userByQQ = yield AgentQq_1.default.checkUserByQq(command.Message.sender_uid);
                const userById = yield AgentQq_1.default.checkUserByAgentId(id);
                if (userByQQ) {
                    command.Message.Reply('已经绑定过了哟');
                    return HandleResult_1.default.Handled;
                }
                if (userById) {
                    command.Message.Reply('不行哦~');
                    return HandleResult_1.default.Handled;
                }
                const agentQq = yield AgentQq_1.default.bindUserByQq(command.Message.sender_uid, id);
                command.Message.Reply('绑定完成！接下来请到群中发指令 K 诶嘿 参与该群特工排行榜');
            }
            catch (err) {
                command.Message.Reply('我好像找不到你诶。你把 AgentStats 资料分享给 Kobirt 了吗？\r\n' + err.message.toString());
                console.error(err);
            }
            return HandleResult_1.default.Handled;
        });
    }
}
class UnbindHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '注销';
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userByQQ = yield AgentQq_1.default.checkUserByQq(command.Message.sender_uid);
                if (!userByQQ) {
                    command.Message.Reply('你还没绑定呢');
                    return HandleResult_1.default.Handled;
                }
                yield userByQQ.unbind();
                command.Message.Reply('再见QAQ');
            }
            catch (err) {
                command.Message.Reply('出了点问题。\r\n' + err.message.toString());
                console.log(err);
            }
            return HandleResult_1.default.Handled;
        });
    }
}
class AccountHandler extends CommandHandlerBase_1.default {
    constructor() {
        super();
        this.Prefix = '账户';
        this.accepted = (command) => command.Content.startsWith(this.Prefix) &&
            !command.Message.group;
        this
            .RegisterSubHandler(new WhoAmIHandler())
            .RegisterSubHandler(new BindHandler())
            .RegisterSubHandler(new UnbindHandler());
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const aprefix = command.GetAccumulatedPrefix() + ' ' + this.Prefix;
            command.Message.Reply(`${aprefix} 我是谁 - 输出已经绑定的特工 ID
${aprefix} 绑定 - 绑定 AgentStats
${aprefix} 注销 - 解除绑定 AgentStats`);
            return HandleResult_1.default.Handled;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AccountHandler;
//# sourceMappingURL=AccountHandler.js.map