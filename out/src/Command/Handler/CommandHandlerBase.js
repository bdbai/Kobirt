"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const HandleResult_1 = require("../../Message/Handler/HandleResult");
const BadCommand_1 = require("../Error/BadCommand");
class CommandHandlerBase {
    constructor() {
        this._subCommandHandlers = Array();
        this.Prefix = '';
        this.accepted = (command) => command.StartsWith(this.Prefix);
    }
    handleError(err, command) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err.constructor.name === BadCommand_1.default.name) {
                command.Message.Reply(err.message);
            }
            else {
                command.Message.Reply(`出了点小问题\r\n${err.message}`);
            }
            console.error(err);
            return HandleResult_1.default.Handled;
        });
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return HandleResult_1.default.Skipped;
        });
    }
    Handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accepted(command)) {
                return HandleResult_1.default.Skipped;
            }
            const subCommand = command.GetSubCommand(this.Prefix);
            let changed = false;
            for (const subHandler of this._subCommandHandlers) {
                switch (yield subHandler.Handle(subCommand)) {
                    case HandleResult_1.default.Changed:
                        changed = true;
                        break;
                    case HandleResult_1.default.Handled:
                        return HandleResult_1.default.Handled;
                }
            }
            changed = (yield this.processCommand(command)) === HandleResult_1.default.Changed || changed;
            return changed ? HandleResult_1.default.Changed : HandleResult_1.default.Handled;
        });
    }
    RegisterSubHandler(subCommand) {
        this._subCommandHandlers.unshift(subCommand);
        return this;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommandHandlerBase;
//# sourceMappingURL=CommandHandlerBase.js.map