"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RemotePicSegment {
    constructor(Url) {
        this.Url = Url;
        this.Type = 'image';
    }
    getBodyData() {
        return {
            file: this.Url
        };
    }
}
exports.default = RemotePicSegment;
//# sourceMappingURL=RemotePicSegment.js.map