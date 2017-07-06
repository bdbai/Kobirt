"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandlerBase_1 = require("./CommandHandlerBase");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
const BadCommand_1 = require("../Error/BadCommand");
const CoolQRichMessage_1 = require("../../Message/Rich/CoolQRichMessage");
const TextSegment_1 = require("../../Message/Rich/TextSegment");
const TrelloAPI_1 = require("../../Ingress/Art/TrelloAPI");
class ArtHandler extends CommandHandlerBase_1.default {
    constructor() {
        super();
        this.Prefix = ['拼图', '组图'];
        this.trello = new TrelloAPI_1.default(process.env.TrelloKey, process.env.TrelloToken);
    }
    async processCommand(command) {
        const kw = command.GetSubCommand(command.GetCurrentContent(this.Prefix)).Content;
        if (kw.length === 0) {
            throw new BadCommand_1.default(`请输入 ${command.GetAccumulatedPrefix()} 拼图 加上关键字来查询任务拼图~`, command);
        }
        const cards = this.trello.SearchCardNames(kw);
        if (cards.length === 0) {
            command.Message.Reply('找不到这个拼图哦~试试用英文呗');
            return HandleResult_1.default.Handled;
        }
        if (cards.length > 5) {
            const slicedCards = cards.slice(0, 5);
            command.Message.Reply('我找到好多个！先列出 5 个咯：\n' + slicedCards.join('\n'));
            return HandleResult_1.default.Handled;
        }
        if (cards.length > 1) {
            command.Message.Reply('我找到这么多拼图，你要哪个呢？\n' + cards.join('\n'));
            return HandleResult_1.default.Handled;
        }
        const realName = encodeURIComponent(cards[0].name.replace(/\[.*\]/, '').trim());
        const detail = await this.trello.FetchCardDetail(cards[0]);
        command.Message.Dispose();
        /*detail.attachments[0].previews.pop().url*/ //图片这是
        //            .AddSegment(new TextSegment('https://ingressmm.com/?find=' + realName))
        new CoolQRichMessage_1.default()
            .AddSegment(new TextSegment_1.default('为你找到了拼图：' + detail.name))
            .AddSegment(new TextSegment_1.default(detail.desc))
            .AddSegment(new TextSegment_1.default(detail.labels.map(i => i.name).join('\n')))
            .AddSegment(new TextSegment_1.default('Trello: ' + detail.shortUrl))
            .AddSegment(new TextSegment_1.default('AQMissionHelper: https://bdbai.github.io/supreme-getlink/jump-aqmh.html#' + realName))
            .AddSegment(new TextSegment_1.default('Ingress Mosaik: https://ingressmosaik.com/search?f=' + realName))
            .ReplyToMessage(command.Message);
        return HandleResult_1.default.Handled;
    }
}
exports.default = ArtHandler;
//# sourceMappingURL=ArtHandler.js.map