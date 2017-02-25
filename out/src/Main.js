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
const WhoAmIHandler_1 = require("./Command/Handler/WhoAmIHandler");
const BindHandler_1 = require("./Command/Handler/BindHandler");
const UnbindHandler_1 = require("./Command/Handler/UnbindHandler");
const ShowoffHandler_1 = require("./Command/Handler/ShowoffHandler");
const JoinGroupHandler_1 = require("./Command/Handler/JoinGroupHandler");
const L8MeetupHandler_1 = require("./Command/Handler/L8MeetupHandler");
const DisplayHandler_1 = require("./Command/Handler/StupidWords/DisplayHandler");
const AddHandler_1 = require("./Command/Handler/StupidWords/AddHandler");
const DelHandler_1 = require("./Command/Handler/StupidWords/DelHandler");
// Event dispatcher
const EventDispatcher_1 = require("./Event/EventDispatcher");
const TaskManager_1 = require("./Task/Manager/TaskManager");
const WeeklyNotifyTask_1 = require("./Task/TaskItem/WeeklyNotifyTask");
const WeeklySumupTask_1 = require("./Task/TaskItem/WeeklySumupTask");
// services init
const AV = require("leancloud-storage");
const qiniu = require("qiniu");
class Server {
    static InitMessageManager() {
        const commandHandler = new CommandHandler_1.default('K')
            .RegisterSubHandler(new HelpHandler_1.default())
            .RegisterSubHandler(new WhoAmIHandler_1.default())
            .RegisterSubHandler(new BindHandler_1.default())
            .RegisterSubHandler(new UnbindHandler_1.default())
            .RegisterSubHandler(new JoinGroupHandler_1.default())
            .RegisterSubHandler(new ShowoffHandler_1.default())
            .RegisterSubHandler(new L8MeetupHandler_1.default())
            .RegisterSubHandler(new AddHandler_1.default())
            .RegisterSubHandler(new DelHandler_1.default())
            .RegisterSubHandler(new DisplayHandler_1.default());
        return new MessageManager_1.default(EventDispatcher_1.default, [
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
        qiniu.conf.ACCESS_KEY = process.env.QiniuAK;
        qiniu.conf.SECRET_KEY = process.env.QiniuSK;
        const taskManager = new TaskManager_1.default(new WeeklyNotifyTask_1.default('马上开始统计本周进度了，赶快更新 AgentStats 资料吧！\n说“K 诶嘿”参加统计，“K 诶嘿 算了吧”退出统计\n本周未更新数据的特工不能参加排名！'), new WeeklySumupTask_1.default());
        const app = express();
        app.use(bodyParser.json());
        new RequestAdapter_1.default(app, Server.InitMessageManager());
        app.listen(process.env.PORT || 5001);
        process.on('unhandledRejection', err => console.error(err.stack));
        return 0;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Server;
//# sourceMappingURL=Main.js.map