"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggedinHandlerBase_1 = require("./LoggedinHandlerBase");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
const QqGroup_1 = require("../../Model/QqGroup");
const BadCommand_1 = require("../Error/BadCommand");
class ExitGroupHandler extends LoggedinHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '算了吧';
    }
    async processUserCommand(command, user) {
        const qqGroup = await QqGroup_1.default.findQqGroup(user, command.Message.group_id);
        if (!qqGroup)
            throw new BadCommand_1.default('你还没诶嘿呢', command);
        await qqGroup.destroy();
        command.Message.Reply('好吧，再见朋友QAQ');
        return HandleResult_1.default.Handled;
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
    async processUserCommand(command, user) {
        const thisGroup = command.Message.group_id.toString();
        const qqGroup = await QqGroup_1.default.findQqGroup(user, command.Message.group_id);
        if (qqGroup)
            throw new BadCommand_1.default(`我认识你，${user.AgentId}！不用重复诶嘿！
退出排行榜请说 ${command.GetAccumulatedPrefix()} ${command.GetCurrentContent(this.Prefix)} 算了吧`, command);
        await QqGroup_1.default.addMemberToList(user, command.Message.group_id);
        command.Message.Reply(`好的 ${user.AgentId}，从下周开始排行榜会算上你的。请及时更新数据，否则无法参与当周排名。
后悔的话请说 ${command.GetAccumulatedPrefix()} ${command.GetCurrentContent(this.Prefix)} 算了吧`);
        return HandleResult_1.default.Handled;
    }
}
exports.default = JoinGroupHandler;
//# sourceMappingURL=JoinGroupHandler.js.map