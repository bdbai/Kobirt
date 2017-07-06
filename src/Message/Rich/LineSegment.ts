import TextSegment from './TextSegment';

export default class LineSegment extends TextSegment {
    constructor(Body: string, public LineEnd = '\n') {
        super(Body);
    }
    getBodyData() {
        return { "text": this.Body + this.LineEnd }
    }
}