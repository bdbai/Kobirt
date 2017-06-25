"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("node-fetch");
const SERVER_URI = process.env.WebqqURL;
async function sendJsonObj(path, params = {}) {
    const res = await fetch(SERVER_URI + path, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json'
        }
    });
    return await res.json();
}
exports.sendJsonObj = sendJsonObj;
//# sourceMappingURL=API.js.map