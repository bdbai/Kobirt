"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("node-fetch");
class TrelloAPI {
    constructor(trelloKey, trelloToken) {
        this.trelloKey = trelloKey;
        this.trelloToken = trelloToken;
        this.cachedCards = null;
        this.RefreshCardNames();
    }
    async RefreshCardNames() {
        const response = await fetch(`https://api.trello.com/1/boards/5666779e6c24bb815183689c/cards?fields=name&key=${this.trelloKey}&token=${this.trelloToken}`);
        this.cachedCards = await response.json();
        console.log(`Loaded ${this.cachedCards.length} medal arts`);
        this.cachedCards.forEach(i => {
            Object.assign(i, {
                toString: function () {
                    return this.name;
                }
            });
        });
    }
    SearchCardNames(keyword) {
        const lowerKw = keyword.toLowerCase();
        if (this.cachedCards === null) {
            throw new Error('拼图还没加载完，请稍候再试。');
        }
        return this.cachedCards
            .filter(c => c.name.toLowerCase().includes(lowerKw));
    }
    async FetchCardDetail(cardName) {
        const response = await fetch(`https://api.trello.com/1/cards/${cardName.id}\?fields\=name,desc,labels,shortUrl\&attachments\=cover\&attachment_fields\=previews\&key\=${this.trelloKey}\&token\=${this.trelloToken}`);
        return await response.json();
    }
}
exports.default = TrelloAPI;
//# sourceMappingURL=TrelloAPI.js.map