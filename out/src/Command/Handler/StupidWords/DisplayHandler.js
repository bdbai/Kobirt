"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CommandHandlerBase_1 = require("../CommandHandlerBase");
const HandleResult_1 = require("../../../Message/Handler/HandleResult");
const fs = require("fs");
const events_1 = require("events");
class ChangeEvent extends events_1.EventEmitter {
    constructor(filePath) {
        super();
        this.filePath = filePath;
        const watcher = fs.watch(filePath, (e, file) => {
            e === 'change' && this.loadNewWords();
        });
    }
    loadNewWords() {
        let res;
        try {
            res = JSON.parse(fs.readFileSync(process.env.StupidWordsFile).toString());
            console.log('Loaded new stupid words');
            this.emit('refresh', res);
        }
        catch (err) {
            console.error('Error loading stupid words');
        }
    }
    ready() {
        this.loadNewWords();
        return this;
    }
}
class DisplayHandler extends CommandHandlerBase_1.default {
    constructor() {
        super();
        this.accepted = () => true;
        const changeEvent = new ChangeEvent(process.env.StupidWordsFile)
            .on('refresh', newWords => this.words = newWords)
            .on('error', err => console.error(err))
            .ready();
    }
    processCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const word of this.words.words) {
                if (!!word.kw.find(i => command.Content.startsWith(i))) {
                    const i = Math.floor(Math.random() * word.text.length);
                    command.Message.Reply(word.text[i]);
                    return HandleResult_1.default.Handled;
                }
            }
            return HandleResult_1.default.Skipped;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DisplayHandler;
//# sourceMappingURL=DisplayHandler.js.map