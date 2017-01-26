import CommandHandlerBase from '../CommandHandlerBase';
import Command from '../../Command';
import HandleResult from '../../../Message/Handler/HandleResult';
import BadCommand from '../../Error/BadCommand';
import IWords from './IWords';
import * as fs from 'fs';

export default class DelHandler extends CommandHandlerBase {
    public Prefix = '忘记';

    protected acceptFriendMessage = false;

    public async processCommand(command: Command) {
        // Super Anti-Konammzju Design
        // a.k.a SAD
        if (command.Message.sender_uid === 40603473) {
            throw new BadCommand('寿司！你看看你！', command);
        }

        const pattern = command.GetSubCommand(this.Prefix).Content;
        const instructions = pattern.split('=');

        if (instructions.length < 2) {
            throw new BadCommand('格式\nK 忘记 关键词=要删除的话', command);
        }

        const filePath = process.env.StupidWordsFile as string;

        // Handle multiple '='
        const [ kw, ...segs ] = instructions;
        const seg = segs.join('=');

        if (kw.length < 1 || seg.length < 1) {
            throw new BadCommand('你再说一遍？', command);
        }

        const oldWords = JSON.parse(
                fs.readFileSync(process.env.StupidWordsFile).toString()
             ) as IWords;
        const oldWord = oldWords.words.find(i => !!(i.kw.find(j => j === kw)));
        if (oldWord) {
            // kw exists. Check if seg exists.
            if (!oldWord.text.find(i => i === seg)) {
                throw new BadCommand('K 菊没说过这个。', command);
            }

            oldWord.text = oldWord.text.filter(i => i !== seg);
        } else {
            throw new BadCommand('你说什么？我听不清……', command);
        }

        fs.writeFileSync(filePath, JSON.stringify(oldWords));
        command.Message.Reply(`你说 ${kw}，K 菊不说 ${seg}`);
        return HandleResult.Handled;
    }

}