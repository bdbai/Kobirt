"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LinkSegment {
    constructor(Url, Title = '链接分享', Content = '', Image = '') {
        this.Url = Url;
        this.Title = Title;
        this.Content = Content;
        this.Image = Image;
        this.Type = 'share';
    }
    getBodyData() {
        return {
            url: this.Url,
            title: this.Title,
            content: this.Content,
            image: this.Image
        };
    }
}
exports.default = LinkSegment;
//# sourceMappingURL=LinkSegment.js.map