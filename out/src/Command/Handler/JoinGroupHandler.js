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
const QqGroup_1 = require("../../Model/QqGroup");
const BadCommand_1 = require("../Error/BadCommand");
class ExitGroupHandler extends LoggedinHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '算了吧';
    }
    processUserCommand(command, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const qqGroup = yield QqGroup_1.default.findQqGroup(user, command.Message.group_uid);
            if (!qqGroup)
                throw new BadCommand_1.default('你还没诶嘿呢', command);
            yield qqGroup.destroy();
            command.Message.Reply('好吧，再见朋友QAQ');
            return HandleResult_1.default.Handled;
        });
    }
}
class JoinGroupHandler extends LoggedinHandlerBase_1.default {
    constructor() {
        super();
        this.Prefix = ['诶嘿', '哎嘿', '唉嘿', '欸嘿'];
        this.acceptFriendMessage = false;
        this
            .RegisterSubHandler(new ExitGroupHandler());
    }
    processUserCommand(command, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const thisGroup = command.Message.group_uid.toString();
            const qqGroup = yield QqGroup_1.default.findQqGroup(user, command.Message.group_uid);
            if (qqGroup)
                throw new BadCommand_1.default(`我认识你，${user.AgentId}！
退出排行榜请说 ${command.GetAccumulatedPrefix()} ${command.GetCurrentContent(this.Prefix)} 算了吧`, command);
            yield QqGroup_1.default.addMemberToList(user, command.Message.group_uid);
            command.Message.Reply(`${user.AgentId} 我记住你了。下次排行榜会算上你的。请及时更新数据，否则无法参与当周排名。
后悔的话请说 ${command.GetAccumulatedPrefix()} ${command.GetCurrentContent(this.Prefix)} 算了吧`);
            return HandleResult_1.default.Handled;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JoinGroupHandler;
//# sourceMappingURL=JoinGroupHandler.js.map