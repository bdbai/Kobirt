"use strict";
const API_1 = require("../../Webqq/API");
const NewGroupMemberHandler = (friend, group) => {
    API_1.SendGroupMessage(group.uid.toString(), `欢迎新人 ${friend.name}！
重要：过马路时千万不要看手机！！！
萌新请先阅读群共享中的《萌新入门宝典》
发“K 绑定”来绑定 Ingress 账户，参与互动

记得膜 K~`);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewGroupMemberHandler;
//# sourceMappingURL=NewGroupMemberHandler.js.map