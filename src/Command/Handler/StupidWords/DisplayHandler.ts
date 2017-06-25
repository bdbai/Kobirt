import CommandHandlerBase from '../CommandHandlerBase';
import Command from '../../Command';
import HandleResult from '../../../Message/Handler/HandleResult';
import IWords from './IWords';
import * as fs from 'fs';
import { EventEmitter } from 'events';

class ChangeEvent extends EventEmitter {
    constructor(private filePath) {
        super();

        const watcher = fs.watch(
            filePath,
            (e, file) => {
                e === 'change' && this.loadNewWords();
            });
    }

    private loadNewWords() {
        let res: IWords;
        try {
            res = JSON.parse(
                fs.readFileSync(process.env.StupidWordsFile).toString()
            ) as IWords;
            console.log('Loaded new stupid words')
            this.emit('refresh', res);
        } catch (err) {
            console.error('Error loading stupid words');
        }
    }

    ready() {
        this.loadNewWords();
        return this;
    }
}

let words: IWords;

function pickText(texts: Array<string>) {
    const i = Math.floor(Math.random() * texts.length);
    return texts[i];
}


export class BlacklistHandler extends CommandHandlerBase {
    public accepted = () => true;

    private blacklistCount = new Map<number, number>();

    public async processCommand(command: Command) {
        const senderQq = command.Message.user_id;
        for (const blacklist of words.blacklist) {
            if (blacklist.qq === senderQq) {
                // Block this QQ
                const count = this.blacklistCount.get(senderQq);
                if (count === blacklist.retry) {
                    // Max retry exceeded
                    this.blacklistCount.set(senderQq, 0);
                    command.Message.Reply(pickText(blacklist.text));
                } else {
                    // Fail silently
                    this.blacklistCount.set(senderQq, count ? count + 1 : 2);
                    command.Message.Dispose();
                }
                return HandleResult.Handled;
            }
        }

        return HandleResult.Skipped;
    }
}
export class DisplayHandler extends CommandHandlerBase {
    public accepted = () => true;

    public pickText(texts: Array<string>) {
        const i = Math.floor(Math.random() * texts.length);
        return texts[i];
    }

    public async processCommand(command: Command) {
        for (const word of words.words) {
            if (!!word.kw.find(i =>
                command.Content.toLowerCase().
                    startsWith(i.toLowerCase()))
            ) {
                command.Message.Reply(this.pickText(word.text));
                return HandleResult.Handled;
            }
        }
        return HandleResult.Skipped;
    }

    constructor() {
        super();

        const changeEvent = new ChangeEvent(process.env.StupidWordsFile)
            .on('refresh', newWords => words = newWords)
            .on('error', err => console.error(err))
            .ready();
    }
}