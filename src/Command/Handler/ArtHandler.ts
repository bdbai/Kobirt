import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import BadCommand from '../Error/BadCommand';
import CoolQRichMessage from '../../Message/Rich/CoolQRichMessage';
import LineSegment from '../../Message/Rich/LineSegment';
import TrelloAPI from '../../Ingress/Art/TrelloAPI';
import ICard from '../../Ingress/Art/ICard';

export default class ArtHandler extends CommandHandlerBase {
    private trello: TrelloAPI;

    public Prefix = ['拼图', '组图'];

    public async processCommand(command: Command): Promise<HandleResult> {
        const kw = command.GetSubCommand(command.GetCurrentContent(this.Prefix)).Content;
        if (kw.length === 0) {
            throw new BadCommand(`请输入 ${command.GetAccumulatedPrefix()} 拼图 加上关键字来查询任务拼图~`, command);
        }
        const cards = this.trello.SearchCardNames(kw);
        if (cards.length === 0) {
            command.Message.Reply('找不到这个拼图哦~试试用英文呗');
            return HandleResult.Handled;
        }
        if (cards.length > 5) {
            const slicedCards = cards.slice(0, 5);
            command.Message.Reply('我找到好多个！先列出 5 个咯：\n' + slicedCards.join('\n'));
            return HandleResult.Handled;
        }
        if (cards.length > 1) {
            command.Message.Reply('我找到这么多拼图，你要哪个呢？\n' + cards.join('\n'));
            return HandleResult.Handled;
        }

        const realName = encodeURIComponent(cards[0].name.replace(/\[.*\]/, '').trim());
        const detail = await this.trello.FetchCardDetail(cards[0]);
        command.Message.Dispose();
        /*detail.attachments[0].previews.pop().url*/ //图片这是
        //            .AddSegment(new TextSegment('https://ingressmm.com/?find=' + realName))
        new CoolQRichMessage()
            .AddSegment(new LineSegment('为你找到了拼图：' + detail.name))
            .AddSegment(new LineSegment(detail.desc))
            .AddSegment(new LineSegment(detail.labels.map(i => i.name).join('\n')))
            .AddSegment(new LineSegment('Trello: ' + detail.shortUrl))
            .AddSegment(new LineSegment('AQMissionHelper: https://bdbai.github.io/supreme-getlink/jump-aqmh.html#' + realName))
            .AddSegment(new LineSegment('Ingress Mosaik: https://ingressmosaik.com/search?f=' + realName))
            .ReplyToMessage(command.Message);

        return HandleResult.Handled;
    }

    constructor() {
        super();

        this.trello = new TrelloAPI(
            process.env.TrelloKey,
            process.env.TrelloToken
        );
    }
}