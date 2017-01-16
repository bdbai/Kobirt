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

// LeanCloud init
import * as AV from 'leancloud-storage';

class Server {

    public static InitMessageManager(): IMessageManager {
        const commandHandler = new CommandHandler('K')
            // Insert your command handlers here!
            .RegisterSubHandler(new HelpHandler())
            .RegisterSubHandler(new AccountHandler())
            .RegisterSubHandler(new JoinGroupHandler())
            .RegisterSubHandler(new ShowoffHandler());
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

        const app = express();
        app.use(bodyParser.json());
        new RequestAdapter(app, Server.InitMessageManager());
        app.listen(process.env.PORT || 5001);
        return 0;
    }
}

export default Server;