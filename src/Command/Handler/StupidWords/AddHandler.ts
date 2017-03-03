import CommandHandlerBase from '../CommandHandlerBase';
import Command from '../../Command';
import HandleResult from '../../../Message/Handler/HandleResult';
import BadCommand from '../../Error/BadCommand';
import IWords from './IWords';
import * as fs from 'fs';

export default class AddHandler extends CommandHandlerBase {
    public Prefix = '记住';

    protected acceptFriendMessage = false;

    public async processCommand(command: Command) {
        const pattern = command.GetSubCommand(this.Prefix).Content;
        const instructions = pattern.split('=');

        if (instructions.length < 2) {
            throw new BadCommand('格式：\nK 记住 关键词=要说的话', command);
        }

        const filePath = process.env.StupidWordsFile as string;

        // Handle multiple '='
        const [ rawKw, ...segs ] = instructions;
        const kw = rawKw.trim();
        const seg = segs.join('=').trim();

        if (kw.length < 1 || seg.length < 1) {
            throw new BadCommand('你再说一遍？', command);
        }

        const oldWords = JSON.parse(
                fs.readFileSync(process.env.StupidWordsFile).toString()
             ) as IWords;
        const oldWord = oldWords.words.find(i => !!(i.kw.find(j => j === kw)));
        if (oldWord) {
            // kw exists. Check if seg exists.
            if (oldWord.text.find(i => i === seg)) {
                throw new BadCommand('K 菊说过了。', command);
            }

            oldWord.text.push(seg);
        } else {
            oldWords.words.push({
                kw: [ kw ],
                text: [ seg ]
            });
        }

        // Bring long keywords to front
        oldWords.words.sort((a, b) => b.kw[0].length - a.kw[0].length);

        fs.writeFileSync(filePath, JSON.stringify(oldWords));
        command.Message.Reply(`你说 K ${kw}，K 菊说 ${seg}`);
        return HandleResult.Handled;
    }

}