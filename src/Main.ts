import * as express from 'express';
import * as bodyParser from 'body-parser';
import IMessageManager from './Message/Manager/IMessageManager';
import MessageManager from './Message/Manager/MessageManager';
import RequestAdapter from './RequestAdapter/RequestAdapter';

// Message handlers
import HelloHandler from './Message/Handler/HelloHandler';
import CommandMessageHandler from './Message/Handler/CommandMessageHandler';
import DisposeHandler from './Message/Handler/DisposeHandler';

// Command handlers
import CommandHandler from './Command/Handler/CommandHandler';
import HelpHandler from './Command/Handler/HelpHandler';
import AccountHandler from './Command/Handler/AccountHandler';
import ShowoffHandler from './Command/Handler/ShowoffHandler';
import JoinGroupHandler from './Command/Handler/JoinGroupHandler';
import L8MeetupHandler from './Command/Handler/L8MeetupHandler';

// Scheduled tasks
import ITaskManager from './Task/Manager/ITaskManager';
import TaskManager from './Task/Manager/TaskManager';
import WeeklyNotifyTask from './Task/TaskItem/WeeklyNotifyTask';
import WeeklySumupTask from './Task/TaskItem/WeeklySumupTask';

// services init
import * as AV from 'leancloud-storage';
import * as qiniu from 'qiniu';

class Server {

    public static InitMessageManager(): IMessageManager {
        const commandHandler = new CommandHandler('K')
            // Insert your command handlers here!
            .RegisterSubHandler(new HelpHandler())
            .RegisterSubHandler(new AccountHandler())
            .RegisterSubHandler(new JoinGroupHandler())
            .RegisterSubHandler(new ShowoffHandler())
            .RegisterSubHandler(new L8MeetupHandler());
        return new MessageManager([
            new HelloHandler(),
            new CommandMessageHandler(commandHandler),
            // Insert your message handlers here!
            new DisposeHandler()
        ]);
    }

    public static Main(): Number {
        AV.init({
            appId: process.env.LeanAppId,
            appKey: process.env.LeanAppKey
        });
        qiniu.conf.ACCESS_KEY = process.env.QiniuAK;
        qiniu.conf.SECRET_KEY = process.env.QiniuSK;

        const taskManager: ITaskManager = new TaskManager(
            new WeeklyNotifyTask('马上开始统计本周进度了，赶快更新 AgentStats 资料吧！'),
            new WeeklySumupTask()
        );

        const app = express();
        app.use(bodyParser.json());
        new RequestAdapter(app, Server.InitMessageManager());
        app.listen(process.env.PORT || 5001);
        return 0;
    }
}

export default Server;