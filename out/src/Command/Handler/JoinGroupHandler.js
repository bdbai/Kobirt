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
const QqGroup_1 = require("../../Ingress/AgentStats/QqGroup");
class ExitGroupHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '算了吧';
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield AgentQq_1.default.checkUserByQq(command.Message.sender_uid);
                if (!user)
                    throw new Error('别捣乱QAQ');
                const qqGroup = yield QqGroup_1.default.findQqGroup(user, command.Message.group_uid);
                if (!qqGroup)
                    throw new Error('你还没诶嘿呢');
                yield qqGroup.destroy();
                command.Message.Reply('好吧，再见朋友QAQ');
            }
            catch (err) {
                return this.handleError(err, command);
            }
        });
    }
}
class JoinGroupHandler extends CommandHandlerBase_1.default {
    constructor() {
        super();
        this.Prefix = '诶嘿';
        this.accepted = (command) => command.StartsWith(this.Prefix) &&
            !!command.Message.group;
        this
            .RegisterSubHandler(new ExitGroupHandler());
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const thisGroup = command.Message.group_uid.toString();
            let user;
            try {
                user = yield AgentQq_1.default.checkUserByQq(command.Message.sender_uid);
                if (!user)
                    throw new Error('别捣乱QAQ');
                const qqGroup = yield QqGroup_1.default.findQqGroup(user, command.Message.group_uid);
                if (qqGroup)
                    throw new Error(`我认识你，${user.AgentId}！`);
                yield QqGroup_1.default.addMemberToList(user, command.Message.group_uid);
                command.Message.Reply(`${user.AgentId} 我记住你了。下次排行榜会算上你的。
后悔的话请说 ${command.AccumulatedPrefixes} ${this.Prefix} 算了吧`);
            }
            catch (err) {
                return this.handleError(err, command);
            }
            return HandleResult_1.default.Handled;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JoinGroupHandler;
//# sourceMappingURL=JoinGroupHandler.js.map