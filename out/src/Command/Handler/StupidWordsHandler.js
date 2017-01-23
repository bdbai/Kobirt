"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CommandHandlerBase_1 = require("./CommandHandlerBase");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
const fs = require("fs");
class StupidWordsHandler extends CommandHandlerBase_1.default {
    constructor() {
        super();
        this.accepted = () => true;
        this.reloadHandler = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.initialWords();
            }
            catch (err) {
                console.error(err);
            }
        }), 1000 * 1800);
        this.initialWords();
    }
    initialWords() {
        return __awaiter(this, void 0, void 0, function* () {
            const str = yield new Promise((res, rej) => {
                fs.readFile(process.env.StupidWordsFile, (err, data) => {
                    if (err) {
                        rej(err);
                        return;
                    }
                    res(data);
                });
            });
            this.words = JSON.parse(str);
        });
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
exports.default = StupidWordsHandler;
//# sourceMappingURL=StupidWordsHandler.js.map