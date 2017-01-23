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
const L8Meetup_1 = require("../../Model/L8Meetup");
const BadCommand_1 = require("../Error/BadCommand");
class DoneHandler extends LoggedinHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '耶';
    }
    processUserCommand(command, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const meetups = yield L8Meetup_1.default.fetchFromGroup(command.Message.group_uid);
            if (meetups.length === 0)
                throw new BadCommand_1.default('咱能先起八不', command);
            command.Message.Reply(`起八完成！${meetups.length < 8 ? '人不够，毒来凑！' : '嘿嘿~'}参与人员：
${meetups.map(i => '@' + i.AgentQq.AgentId).join('\r\n')}`);
            yield L8Meetup_1.default.destroyAll(meetups);
            return HandleResult_1.default.Handled;
        });
    }
}
class ExitHandler extends LoggedinHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '算了吧';
    }
    processUserCommand(command, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const group_uid = command.Message.group_uid;
            const group = group_uid.toString();
            const meetups = yield L8Meetup_1.default.fetchFromQq(user);
            const thisMeetup = meetups.find(i => i.Group === group);
            if (!thisMeetup) {
                throw new BadCommand_1.default(`别捣乱，${user.AgentId}！`, command);
            }
            yield thisMeetup.destroy();
            command.Message.Reply(`啊呀，${user.AgentId} 不来了！`);
            return HandleResult_1.default.Handled;
        });
    }
}
class AddHandler extends LoggedinHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '带上我';
    }
    processUserCommand(command, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const group_uid = command.Message.group_uid;
            const group = group_uid.toString();
            const meetups = yield L8Meetup_1.default.fetchFromQq(user);
            if (meetups.find(i => i.Group === group)) {
                throw new BadCommand_1.default(`已经带上 ${user.AgentId} 啦`, command);
            }
            yield L8Meetup_1.default.addQqToMeetup(user, group_uid);
            command.Message.Reply(`好的，一定带上 ${user.AgentId}！`);
            return HandleResult_1.default.Handled;
        });
    }
}
class L8MeetupHandler extends LoggedinHandlerBase_1.default {
    constructor() {
        super();
        this.tips = (aprefix) => `指令：
${aprefix} 带上我 - 加入起八
${aprefix} 算了吧 - 退出起八
${aprefix} 耶 - 完成起八`;
        this.Prefix = ['起八', '起七', '起九'];
        this.acceptFriendMessage = false;
        this
            .RegisterSubHandler(new AddHandler())
            .RegisterSubHandler(new ExitHandler())
            .RegisterSubHandler(new DoneHandler());
    }
    processUserCommand(command, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const meetups = yield L8Meetup_1.default.fetchFromGroup(command.Message.group_uid);
            if (meetups.length > 0) {
                // Display this L8Meetup
                const len = meetups.length;
                command.Message.Reply(`起八状态：人${len >= 8 ? '齐了' : '没齐'}（${len}/8）
${meetups.map(i => '@' + i.AgentQq.AgentId).join('\r\n')}
${this.tips(`${command.GetAccumulatedPrefix()} ${command.GetCurrentContent()}`)}`);
            }
            else {
                // Create a new L8Meetup
                yield L8Meetup_1.default.addQqToMeetup(user, command.Message.group_uid);
                command.Message.Reply(`${user.AgentId} 发起了起八！其他人可以发${this.tips(`${command.GetAccumulatedPrefix()} ${command.GetCurrentContent()}`)}`);
            }
            return HandleResult_1.default.Handled;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = L8MeetupHandler;
//# sourceMappingURL=L8MeetupHandler.js.map