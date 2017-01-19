import * as fetch from 'node-fetch';

const SERVER_URI = process.env.WebqqURL;

const searchParams = (params) => Object.keys(params).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');

async function sendPostForm(path: string, params = {}) {
    const res = await fetch(SERVER_URI + path, {
        method: 'POST',
        body: searchParams(params),
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
    return await res.json();
}

export async function SendFriendMessage(uid: string, content: string) {
    return sendPostForm('/openqq/send_friend_message',
        { uid: uid, content: content });
}

export async function SendGroupMessage(uid: string, content: string) {
    return sendPostForm('/openqq/send_group_message',
        { uid: uid, content: content });
}