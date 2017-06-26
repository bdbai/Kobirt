import ISegment from './ISegment';

export default class RemotePicSegment implements ISegment {
    public Type = 'image';
    constructor(public Url: string) { }
    public getBodyData() {
        return {
            file: this.Url
        }
    }
}