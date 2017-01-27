"use strict";
const NewFriendHandler_1 = require("./Handler/NewFriendHandler");
const LoseFriendHandler_1 = require("./Handler/LoseFriendHandler");
const NewGroupMemberHandler_1 = require("./Handler/NewGroupMemberHandler");
const LoseGroupMemberHandler_1 = require("./Handler/LoseGroupMemberHandler");
const EventDispatcher = (message) => {
    switch (message.event) {
        case 'new_friend':
            NewFriendHandler_1.default(message.param[0]);
            break;
        case 'lose_friend':
            LoseFriendHandler_1.default(message.param[0]);
            break;
        case 'new_group_member':
            NewGroupMemberHandler_1.default(message.param[0], message.param[1]);
            break;
        case 'lose_group_member':
            LoseGroupMemberHandler_1.default(message.param[0], message.param[1]);
            break;
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventDispatcher;
//# sourceMappingURL=EventDispatcher.js.map