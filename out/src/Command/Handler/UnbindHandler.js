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
const AgentQq_1 = require("../../Model/AgentQq");
const BadCommand_1 = require("../Error/BadCommand");
class UnbindHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '注销';
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const userByQQ = yield AgentQq_1.default.checkUserByQq(command.Message.sender_uid);
            if (!userByQQ)
                throw new BadCommand_1.default('你还没绑定呢', command);
            yield userByQQ.unbind();
            command.Message.Reply('再见QAQ\r\n记得到 AgentStats 网站取消分享哦~');
            return HandleResult_1.default.Handled;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UnbindHandler;
//# sourceMappingURL=UnbindHandler.js.map