"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventDispatcher = (message) => {
    /*switch (message.event) {
        case 'new_friend':
            NewFriendHandler(message.params[0]);
            break;
        case 'lose_friend':
            LoseFriendHandler(message.params[0]);
            break;
        case 'new_group_member':
            NewGroupMemberHandler(message.params[0], message.params[1]);
            break;
        case 'lose_group_member':
            LoseGroupMemberHandler(message.params[0], message.params[1]);
            break;
    }*/
    message.Dispose();
};
exports.default = EventDispatcher;
//# sourceMappingURL=EventDispatcher.js.map