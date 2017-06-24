"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = require("../../Webqq/API");
class CoolQRichMessage {
    constructor() {
        this.Segments = Array();
    }
    SendToGroup(group_uid) {
        return API_1.sendJsonObj('/send_group_msg', {
            group_id: group_uid,
            message: this.Segments.map(seg => ({
                type: seg.Type,
                data: seg.getBodyData()
            }))
        });
    }
    SendToFriend(member_uid) {
        return API_1.sendJsonObj('/send_private_msg', {
            user_id: member_uid,
            message: this.Segments.map(seg => ({
                type: seg.Type,
                data: seg.getBodyData()
            }))
        });
    }
    ReplyToMessage(message) {
        message.Dispose();
        if (message.message_type === 'group') {
            return this.SendToGroup(message.group_id);
        }
        else {
            return this.SendToFriend(message.user_id);
        }
    }
    AddSegment(segment) {
        this.Segments.push(segment);
        return this;
    }
}
exports.default = CoolQRichMessage;
//# sourceMappingURL=CoolQRichMessage.js.map