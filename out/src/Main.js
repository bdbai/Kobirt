"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const MessageManager_1 = require("./Message/Manager/MessageManager");
const RequestAdapter_1 = require("./RequestAdapter/RequestAdapter");
// Message handlers
const HelloHandler_1 = require("./Message/Handler/HelloHandler");
const CommandMessageHandler_1 = require("./Message/Handler/CommandMessageHandler");
const DisposeHandler_1 = require("./Message/Handler/DisposeHandler");
// Command handlers
const CommandHandler_1 = require("./Command/Handler/CommandHandler");
const HelpHandler_1 = require("./Command/Handler/HelpHandler");
const AccountHandler_1 = require("./Command/Handler/AccountHandler");
const ShowoffHandler_1 = require("./Command/Handler/ShowoffHandler");
const JoinGroupHandler_1 = require("./Command/Handler/JoinGroupHandler");
// LeanCloud init
const AV = require("leancloud-storage");
class Server {
    static InitMessageManager() {
        const commandHandler = new CommandHandler_1.default('K')
            .RegisterSubHandler(new HelpHandler_1.default())
            .RegisterSubHandler(new AccountHandler_1.default())
            .RegisterSubHandler(new JoinGroupHandler_1.default())
            .RegisterSubHandler(new ShowoffHandler_1.default());
        return new MessageManager_1.default([
            new HelloHandler_1.default(),
            new CommandMessageHandler_1.default(commandHandler),
            // Insert your message handlers here!
            new DisposeHandler_1.default()
        ]);
    }
    static Main() {
        AV.init({
            appId: process.env.LeanAppId,
            appKey: process.env.LeanAppKey
        });
        const app = express();
        app.use(bodyParser.json());
        new RequestAdapter_1.default(app, Server.InitMessageManager());
        app.listen(process.env.PORT || 5001);
        return 0;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Server;
//# sourceMappingURL=Main.js.map