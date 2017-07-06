"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextSegment_1 = require("./TextSegment");
class LineSegment extends TextSegment_1.default {
    constructor(Body, LineEnd = '\n') {
        super(Body);
        this.LineEnd = LineEnd;
    }
    getBodyData() {
        return { "text": this.Body + this.LineEnd };
    }
}
exports.default = LineSegment;
//# sourceMappingURL=LineSegment.js.map