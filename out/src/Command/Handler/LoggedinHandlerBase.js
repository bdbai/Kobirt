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
class LoggedinHandlerBase extends CommandHandlerBase_1.default {
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield AgentQq_1.default.checkUserByQq(command.Message.sender_uid);
                if (!user)
                    throw new BadCommand_1.default('你还没绑定账户呢，请给加我为好友，发私信 K 账户 绑定', command);
            }
            catch (err) {
                this.handleError(err, command);
                return HandleResult_1.default.Handled;
            }
            return yield this.processUserCommand(command, user);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoggedinHandlerBase;
//# sourceMappingURL=LoggedinHandlerBase.js.map