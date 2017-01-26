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
            this.emit('error', err);
        }
    }

    ready() {
        this.loadNewWords();
        return this;
    }
}

export default class DisplayHandler extends CommandHandlerBase {
    public accepted = () => true;

    public words: IWords;

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

        const changeEvent = new ChangeEvent(process.env.StupidWordsFile)
            .on('refresh', newWords => this.words = newWords)
            .on('error', err => console.error(err))
            .ready();
    }
}