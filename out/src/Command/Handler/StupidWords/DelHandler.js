"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandlerBase_1 = require("../CommandHandlerBase");
const HandleResult_1 = require("../../../Message/Handler/HandleResult");
const BadCommand_1 = require("../../Error/BadCommand");
const fs = require("fs");
class DelHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '忘记';
        this.acceptFriendMessage = false;
    }
    async processCommand(command) {
        // Super Anti-Konammzju Design
        // a.k.a SAD
        if (command.Message.user_id === 40603473) {
            throw new BadCommand_1.default('寿司！你看看你！', command);
        }
        const pattern = command.GetSubCommand(this.Prefix).Content;
        const instructions = pattern.split('=');
        if (instructions.length < 2) {
            throw new BadCommand_1.default('格式：\nK 忘记 关键词=要删除的话', command);
        }
        const filePath = process.env.StupidWordsFile;
        // Handle multiple '='
        const [kw, ...segs] = instructions;
        const seg = segs.join('=');
        if (kw.length < 1 || seg.length < 1) {
            throw new BadCommand_1.default('你再说一遍？', command);
        }
        const oldWords = JSON.parse(fs.readFileSync(process.env.StupidWordsFile).toString());
        const oldWord = oldWords.words.find(i => !!(i.kw.find(j => j === kw)));
        if (oldWord) {
            // kw exists. Check if seg exists.
            if (!oldWord.text.find(i => i === seg)) {
                throw new BadCommand_1.default('K 菊没说过这个。', command);
            }
            oldWord.text = oldWord.text.filter(i => i !== seg);
            if (oldWord.text.length === 0) {
                // remove this kw
                oldWords.words = oldWords.words.filter(i => i !== oldWord);
            }
        }
        else {
            throw new BadCommand_1.default('你说什么？我听不清……', command);
        }
        fs.writeFileSync(filePath, JSON.stringify(oldWords));
        command.Message.Reply(`你说 ${kw}，K 菊不说 ${seg}`);
        return HandleResult_1.default.Handled;
    }
}
exports.default = DelHandler;
//# sourceMappingURL=DelHandler.js.map