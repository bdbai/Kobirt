"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const LoggedinHandlerBase_1 = require("./LoggedinHandlerBase");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
const ShareAPI_1 = require("../../Ingress/AgentStats/ShareAPI");
class ShowoffHandler extends LoggedinHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '得瑟';
    }
    processUserCommand(command, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const agent = yield ShareAPI_1.loadUserFromId(user.AgentId);
            if (isNaN(agent.Level)) {
                command.Message.Reply(`${agent.AgentId} 还没有上传数据哦~
请到 www.agent-stats.com 下载应用并上传特工信息`);
                return HandleResult_1.default.Handled;
            }
            const title = agent.Level > 9 ? '大佬' : '特工';
            command.Message.Reply(`${title} ${agent.AgentId} 当前 ${agent.Level} 级，共有勋章 ` +
                `${agent.CountMedals('bronze')} 铜，` +
                `${agent.CountMedals('silver')} 银，` +
                `${agent.CountMedals('gold')} 金，` +
                `${agent.CountMedals('platinum')} 铂，` +
                `${agent.CountMedals('black')} 黑。`);
            return HandleResult_1.default.Handled;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShowoffHandler;
//# sourceMappingURL=ShowoffHandler.js.map