"use strict";
const API_1 = require("../../Webqq/API");
const LoseGroupMemberHandler = (friend, group) => {
    API_1.SendGroupMessage(group.uid.toString(), `啊呀，${friend.name === '昵称未知'
        ? friend.uid.toString()
        : `${friend.name} (${friend.uid.toString()})`} 退群了！`);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoseGroupMemberHandler;
//# sourceMappingURL=LoseGroupMemberHandler.js.map