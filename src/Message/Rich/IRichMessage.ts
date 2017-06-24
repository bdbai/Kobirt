import ISegment from './ISegment';
import IMessage from '../IMessage';
export default interface IRichMessage {
    Segments: Array<ISegment>;
    SendToGroup(group_uid: number);
    SendToFriend(member_uid: number);
    ReplyToMessage(message: IMessage);
    AddSegment(segment: ISegment): IRichMessage;
}
