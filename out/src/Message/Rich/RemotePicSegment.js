"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RemotePicSegment {
    constructor(Url, FileName = 'pic.jpg') {
        this.Url = Url;
        this.FileName = FileName;
        this.Type = 'image';
    }
    getBodyData() {
        return {
            file: this.FileName,
            url: this.Url
        };
    }
}
exports.default = RemotePicSegment;
//# sourceMappingURL=RemotePicSegment.js.map