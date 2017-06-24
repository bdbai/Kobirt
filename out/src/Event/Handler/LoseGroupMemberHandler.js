"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = require("../../Webqq/API");
const LoseGroupMemberHandler = (friend, group) => {
    API_1.SendGroupMessage(group.uid.toString(), `啊呀，${friend.uid === 80000000
        ? '有人'
        : `${friend.name} (${friend.uid.toString()}) `}退群了！`);
};
exports.default = LoseGroupMemberHandler;
//# sourceMappingURL=LoseGroupMemberHandler.js.map