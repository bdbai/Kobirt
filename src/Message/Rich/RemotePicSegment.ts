import ISegment from './ISegment';

export default class RemotePicSegment implements ISegment {
    public Type = 'image';
    constructor(public Url: string, public FileName = 'pic.jpg') { }
    public getBodyData() {
        return {
            file: this.FileName,
            url: this.Url
        }
    }
}