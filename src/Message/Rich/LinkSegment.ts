import ISegment from './ISegment';

export default class LinkSegment implements ISegment {
    public Type = 'share';

    constructor(
        public Url: string,
        public Title = '链接分享',
        public Content = '',
        public Image = ''
    ) { }

    getBodyData() {
        return {
            url: this.Url,
            title: this.Title,
            content: this.Content,
            image: this.Image
        }
    }
}