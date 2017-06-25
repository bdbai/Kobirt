"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextSegment {
    constructor(Body) {
        this.Body = Body;
        this.Type = 'text';
    }
    getBodyData() {
        return { "text": this.Body };
    }
}
exports.default = TextSegment;
//# sourceMappingURL=TextSegment.js.map