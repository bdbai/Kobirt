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
import WhoAmIHandler from './Command/Handler/WhoAmIHandler';
import BindHandler from './Command/Handler/BindHandler';
import UnbindHandler from './Command/Handler/UnbindHandler';
import ShowoffHandler from './Command/Handler/ShowoffHandler';
import JoinGroupHandler from './Command/Handler/JoinGroupHandler';
import L8MeetupHandler from './Command/Handler/L8MeetupHandler';
import { BlacklistHandler, DisplayHandler } from './Command/Handler/StupidWords/DisplayHandler';
import StupidWordsAddHandler from './Command/Handler/StupidWords/AddHandler';
import StupidWordsDelHandler from './Command/Handler/StupidWords/DelHandler';

// Event dispatcher
import EventDispatcher from './Event/EventDispatcher';

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
            .RegisterSubHandler(new BlacklistHandler())
            .RegisterSubHandler(new HelpHandler())
            .RegisterSubHandler(new WhoAmIHandler())
            .RegisterSubHandler(new BindHandler())
            .RegisterSubHandler(new UnbindHandler())
            .RegisterSubHandler(new JoinGroupHandler())
            .RegisterSubHandler(new ShowoffHandler())
            .RegisterSubHandler(new L8MeetupHandler())
            .RegisterSubHandler(new StupidWordsAddHandler())
            .RegisterSubHandler(new StupidWordsDelHandler())
            .RegisterSubHandler(new DisplayHandler());
        return new MessageManager(EventDispatcher,
        [
            new HelloHandler(),
            new CommandMessageHandler(commandHandler),
            // Insert your message handlers here!
            new DisposeHandler()
        ]);
    }

    public static Main(): number {
        AV.init({
            appId: process.env.LeanAppId,
            appKey: process.env.LeanAppKey
        });
        qiniu.conf.ACCESS_KEY = process.env.QiniuAK;
        qiniu.conf.SECRET_KEY = process.env.QiniuSK;

        const taskManager: ITaskManager = new TaskManager(
            new WeeklyNotifyTask('马上开始统计本周进度了，赶快更新 AgentStats 资料吧！\n说“K 诶嘿”参加统计，“K 诶嘿 算了吧”退出统计\n本周未更新数据的特工不能参加排名！'),
            new WeeklySumupTask()
        );

        const app = express();
        app.use(bodyParser.json());
        new RequestAdapter(app, Server.InitMessageManager());
        app.listen(process.env.PORT || 5001);

        process.on('unhandledRejection', err => console.error(err.stack));
        return 0;
    }
}

export default Server;