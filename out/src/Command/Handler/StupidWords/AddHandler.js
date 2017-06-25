"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandlerBase_1 = require("../CommandHandlerBase");
const HandleResult_1 = require("../../../Message/Handler/HandleResult");
const BadCommand_1 = require("../../Error/BadCommand");
const fs = require("fs");
class AddHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = '记住';
        this.acceptFriendMessage = false;
    }
    async processCommand(command) {
        const pattern = command.GetSubCommand(this.Prefix).Content;
        const instructions = pattern.split('=');
        if (instructions.length < 2) {
            throw new BadCommand_1.default('格式：\nK 记住 关键词=要说的话', command);
        }
        const filePath = process.env.StupidWordsFile;
        // Handle multiple '='
        const [rawKw, ...segs] = instructions;
        const kw = rawKw.trim();
        const seg = segs.join('=').trim();
        if (kw.length < 1 || seg.length < 1) {
            throw new BadCommand_1.default('你再说一遍？', command);
        }
        const oldWords = JSON.parse(fs.readFileSync(process.env.StupidWordsFile).toString());
        const oldWord = oldWords.words.find(i => !!(i.kw.find(j => j === kw)));
        if (oldWord) {
            // kw exists. Check if seg exists.
            if (oldWord.text.find(i => i === seg)) {
                throw new BadCommand_1.default('K 菊说过了。', command);
            }
            oldWord.text.push(seg);
        }
        else {
            oldWords.words.push({
                kw: [kw],
                text: [seg]
            });
        }
        // Bring long keywords to front
        oldWords.words.sort((a, b) => b.kw[0].length - a.kw[0].length);
        fs.writeFileSync(filePath, JSON.stringify(oldWords));
        command.Message.Reply(`你说 K ${kw}，K 菊说 ${seg}`);
        return HandleResult_1.default.Handled;
    }
}
exports.default = AddHandler;
//# sourceMappingURL=AddHandler.js.map