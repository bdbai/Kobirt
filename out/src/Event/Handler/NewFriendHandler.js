"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = require("../../Webqq/API");
const NewFriendHandler = (friend) => {
    API_1.SendFriendMessage(friend.uid.toString(), `Hello ${friend.name}!
请给我发 K 绑定 完成账户绑定工作，对我说 K help 查看所有可用命令`);
};
exports.default = NewFriendHandler;
//# sourceMappingURL=NewFriendHandler.js.map