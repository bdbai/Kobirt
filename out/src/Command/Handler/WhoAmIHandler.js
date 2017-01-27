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
class WhoAmIHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '我是谁';
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AgentQq_1.default.checkUserByQq(command.Message.sender_uid);
            if (!user)
                throw new BadCommand_1.default('我好像不认识你诶。请先用指令绑定你的游戏 ID。', command);
            command.Message.Reply(`啊哈！你就是特工 ${user.AgentId} ！`);
            return HandleResult_1.default.Handled;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WhoAmIHandler;
//# sourceMappingURL=WhoAmIHandler.js.map