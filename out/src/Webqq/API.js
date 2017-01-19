"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fetch = require("node-fetch");
const SERVER_URI = process.env.WebqqURL;
const searchParams = (params) => Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');
function sendPostForm(path, params = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(SERVER_URI + path, {
            method: 'POST',
            body: searchParams(params),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });
        return yield res.json();
    });
}
function SendFriendMessage(uid, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendPostForm('/openqq/send_friend_message', { uid: uid, content: content });
    });
}
exports.SendFriendMessage = SendFriendMessage;
function SendGroupMessage(uid, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendPostForm('/openqq/send_group_message', { uid: uid, content: content });
    });
}
exports.SendGroupMessage = SendGroupMessage;
//# sourceMappingURL=API.js.map