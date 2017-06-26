export default interface ICard {
    id: string;
    name: string;
    desc: string;
    labels: Array<
    {
        id: string,
        idBoard: string,
        name: string,
        color: string,
        uses: number
    }>;

    shortUrl: string;
    attachments: Array<{
        id: string,
        previews: Array<{
            bytes: number,
            url: string,
            height: number,
            width: number,
            _id: string,
            scaled: boolean
        }>
    }>;
}