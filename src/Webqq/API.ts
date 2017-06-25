import * as fetch from 'node-fetch';

const SERVER_URI = process.env.WebqqURL;

export async function sendJsonObj(path: string, params = {}) {
    const res = await fetch(SERVER_URI + path, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json'
        }
    });
    return await res.json();
}
