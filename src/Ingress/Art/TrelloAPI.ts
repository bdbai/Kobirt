import ICard from './ICard';
import ITrelloAPI from './ITrelloAPI';
import ICardName from './ICardName';
import * as fetch from 'node-fetch';

export default class TrelloAPI implements ITrelloAPI {

    private cachedCards: Array<ICardName> = null;

    constructor(private trelloKey, private trelloToken) {
        this.RefreshCardNames();
    }

    async RefreshCardNames() {
        const response = await fetch(`https://api.trello.com/1/boards/5666779e6c24bb815183689c/cards?fields=name&key=${this.trelloKey}&token=${this.trelloToken}`);
        this.cachedCards = await response.json();
        console.log(`Loaded ${this.cachedCards.length} medal arts`)
        this.cachedCards.forEach(i => {
            Object.assign(i, {
                toString: function() {
                    return this.name;
                }
            });
        });
    }

    SearchCardNames(keyword: string): Array<ICardName> {
        const lowerKw = keyword.toLowerCase();
        if (this.cachedCards === null) {
            throw new Error('拼图还没加载完，请稍候再试。');
        }
        return this.cachedCards
            .filter(c => c.name.toLowerCase().includes(lowerKw));
    }

    async FetchCardDetail(cardName: ICardName): Promise<ICard> {
        const response = await fetch(`https://api.trello.com/1/cards/${cardName.id}\?fields\=name,desc,labels,shortUrl\&attachments\=cover\&attachment_fields\=previews\&key\=${this.trelloKey}\&token\=${this.trelloToken}`);
        return await response.json();
    }

}