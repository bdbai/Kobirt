"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iconv = require("iconv-lite");
class CoolQMessage {
    constructor(msgs, socket) {
        this.socket = socket;
        switch (msgs[0]) {
            case 'PrivateMessage':
                [
                    this.type,
                    this.user_id,
                    this.message
                ] = [
                    'friend_message',
                    parseInt(msgs[1]),
                    iconv.decode(new Buffer(msgs[2], 'base64'), 'gbk')
                ];
                break;
            case 'GroupMessage':
                [
                    this.type,
                    this.group_id,
                    this.user_id,
                    this.message
                ] = [
                    'group_message',
                    parseInt(msgs[1]),
                    parseInt(msgs[2]),
                    iconv.decode(new Buffer(msgs[3], 'base64'), 'gbk')
                ];
                break;
        }
    }
    Reply(content) {
        console.log(`Message from ${this.user_id} ${this.group_id ? this.group_id : ''}: ${this.message}
Reply: ${content}`);
        let payload = '';
        const encodedContent = iconv.encode(content, 'gbk').toString('base64');
        switch (this.type) {
            case 'friend_message':
                payload = `PrivateMessage ${this.user_id} ${encodedContent}`;
                break;
            case 'group_message':
                payload = `GroupMessage ${this.group_id} ${encodedContent}`;
                break;
        }
        this.socket.send(payload);
    }
    Dispose() {
        // Blaa...
    }
}
exports.default = CoolQMessage;
//# sourceMappingURL=CoolQMessage.js.map