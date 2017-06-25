import ISegment from './ISegment';
import IMessage from '../IMessage';
import IRichMessage from './IRichMessage';
import { sendJsonObj } from '../../Webqq/API'

export default class CoolQRichMessage implements IRichMessage {
    public Segments = Array<ISegment>();
    public SendToGroup(group_uid: number) {
        return sendJsonObj('/send_group_msg', {
            group_id: group_uid,
            message: this.Segments.map(seg => ({
                type: seg.Type,
                data: seg.getBodyData()
            }))
        });
    }
    public SendToFriend(member_uid: number) {
        return sendJsonObj('/send_private_msg', {
            user_id: member_uid,
            message: this.Segments.map(seg => ({
                type: seg.Type,
                data: seg.getBodyData()
            }))
        });
    }
    ReplyToMessage(message: IMessage) {
        message.Dispose();
        if (message.message_type === 'group') {
            return this.SendToGroup(message.group_id);
        } else {
            return this.SendToFriend(message.user_id);
        }
    }
    AddSegment(segment: ISegment) {
        this.Segments.push(segment);
        return this;
    }
}