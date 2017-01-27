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
const AgentQq_1 = require("../../Model/AgentQq");
const BadCommand_1 = require("../Error/BadCommand");
class LoggedinHandlerBase extends CommandHandlerBase_1.default {
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AgentQq_1.default.checkUserByQq(command.Message.sender_uid);
            if (!user)
                throw new BadCommand_1.default('你还没绑定账户呢，请先加我为好友，然后单独给我发指令：K 绑定', command);
            return yield this.processUserCommand(command, user);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoggedinHandlerBase;
//# sourceMappingURL=LoggedinHandlerBase.js.map