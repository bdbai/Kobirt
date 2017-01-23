import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import * as fs from 'fs';

interface Words {
    words: Array<{
        kw: Array<string>,
        text: Array<string>
    }>;
}

export default class StupidWordsHandler extends CommandHandlerBase {
    public accepted = () => true;

    public words: Words;
    public reloadHandler: NodeJS.Timer;

    async initialWords() {
        const str = await new Promise((res, rej) => {
            fs.readFile(process.env.StupidWordsFile, (err, data) => {
                if (err) {
                    rej(err);
                    return;
                }
                res(data);
            });
        }) as string;
        this.words = JSON.parse(str);
    }

    public async processCommand(command: Command) {
        for (const word of this.words.words) {
            if (!!word.kw.find(i => command.Content.startsWith(i))) {
                const i = Math.floor(Math.random() * word.text.length);
                command.Message.Reply(word.text[i]);
                return HandleResult.Handled;
            }
        }
        return HandleResult.Skipped;
    }

    constructor() {
        super();

        this.reloadHandler = setInterval(async () => {
            try {
                await this.initialWords();
            } catch (err) {
                console.error(err);
            }
        }, 1000 * 1800);
        this.initialWords();
    }
}