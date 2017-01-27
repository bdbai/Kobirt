"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const HelpHandler_1 = require("./HelpHandler");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
class CommandHandler extends HelpHandler_1.default {
    constructor(Prefix) {
        super();
        this.Prefix = Prefix;
    }
    processCommand(command) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            command.AccumulatedPrefixes.push(this.Prefix);
            if (command.Message.group &&
                command.GetSubCommand(this.Prefix).Content.length > 0)
                return HandleResult_1.default.Skipped;
            return yield _super("processCommand").call(this, command);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommandHandler;
//# sourceMappingURL=CommandHandler.js.map