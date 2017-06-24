import ISegment from './ISegment';

export default class TextSegment implements ISegment {
    public Type = 'text';
    constructor(public Body: string) { }
    getBodyData() {
        return { "text": this.Body }
    }
}