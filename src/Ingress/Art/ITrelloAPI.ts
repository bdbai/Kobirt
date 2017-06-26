import ICard from './ICard';
import ICardName from './ICardName';

export default interface ITrelloAPI {
    RefreshCardNames();
    SearchCardNames(keyword: string): Array<ICardName>;
    FetchCardDetail(cardName: ICardName): Promise<ICard>;
}