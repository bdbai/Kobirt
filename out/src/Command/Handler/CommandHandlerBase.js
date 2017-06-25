"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleResult_1 = require("../../Message/Handler/HandleResult");
const BadCommand_1 = require("../Error/BadCommand");
class CommandHandlerBase {
    constructor() {
        this._subCommandHandlers = Array();
        this.Prefix = '';
        this.acceptGroupMessage = true;
        this.acceptFriendMessage = true;
        this.accepted = (command) => ((command.Message.message_type === 'private' && this.acceptFriendMessage) ||
            (command.Message.message_type === 'group' && this.acceptGroupMessage)) && (typeof this.Prefix === 'string' ?
            command.StartsWith(this.Prefix) :
            this.Prefix instanceof Array ?
                !!this.Prefix.find(i => command.StartsWith(i)) :
                false);
    }
    async handleError(err, command) {
        if (err instanceof BadCommand_1.default) {
            command.Message.Reply(err.message || 'WTF?');
            console.log(err);
        }
        else {
            command.Message.Reply(`出了点小问题\r\n${err.message}`);
            console.error(err);
        }
        return HandleResult_1.default.Handled;
    }
    async processCommand(command) {
        return HandleResult_1.default.Skipped;
    }
    async Handle(command) {
        if (!this.accepted(command)) {
            return HandleResult_1.default.Skipped;
        }
        const subCommand = command.GetSubCommand(typeof this.Prefix === 'string' ?
            this.Prefix :
            this.Prefix instanceof Array ?
                this.Prefix.find(i => command.StartsWith(i)) :
                '');
        let changed = false;
        for (const subHandler of this._subCommandHandlers) {
            let result;
            try {
                result = await subHandler.Handle(subCommand);
            }
            catch (err) {
                this.handleError(err, subCommand);
                return HandleResult_1.default.Handled;
            }
            switch (result) {
                case HandleResult_1.default.Changed:
                    changed = true;
                    break;
                case HandleResult_1.default.Handled:
                    return HandleResult_1.default.Handled;
            }
        }
        const handleResult = await this.processCommand(command);
        if (handleResult === HandleResult_1.default.Skipped && changed) {
            return HandleResult_1.default.Changed;
        }
        else {
            return handleResult;
        }
    }
    RegisterSubHandler(subCommand) {
        this._subCommandHandlers.push(subCommand);
        return this;
    }
}
exports.default = CommandHandlerBase;
//# sourceMappingURL=CommandHandlerBase.js.map