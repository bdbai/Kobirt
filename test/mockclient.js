#!/usr/bin/env node
'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.text({ type: '*/*' }));
app.all('*', (req, res) => {
    console.log(JSON.stringify(req.headers));
    console.log(req.url);
    console.log(req.body);

    if (req.url.includes('send')) {
        res.json({ "status": "发送成功", "id": 23910327, "code": 0 });
    } else {
        res.json({ "status": "未实现", "id": 23910327, "code": 10086 });
    }
});
app.listen(5000);