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
const ShareAPI_1 = require("../../Ingress/AgentStats/ShareAPI");
function medalCount(level, medals) {
    return medals.filter(i => i.CurrentLevel === level).length;
}
class ShowoffHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '得瑟';
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            let agent;
            try {
                const user = yield AgentQq_1.default.checkUserByQq(command.Message.sender_uid);
                if (!user)
                    throw new Error('你还没绑定账户呢，请给加我为好友，发私信 K 账户 绑定');
                agent = yield ShareAPI_1.loadUserFromId(user.AgentId);
                const title = agent.Level > 9 ? '大佬' : '特工';
                const ms = agent.Medals;
                command.Message.Reply(`${title} ${agent.AgentId} 当前 ${agent.Level} 级，共有勋章 ${medalCount('bronze', ms)} 铜，${medalCount('silver', ms)} 银，${medalCount('gold', ms)} 金， ${medalCount('platinum', ms)} 白金， ${medalCount('black', ms)} 黑。\r\n
包含部分不再颁发的勋章。`);
            }
            catch (err) {
                this.handleError(err, command);
            }
            return HandleResult_1.default.Handled;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShowoffHandler;
//# sourceMappingURL=ShowoffHandler.js.map