import * as express from 'express';
import * as bodyParser from 'body-parser';
import IMessage from '../Message/IMessage';
import IMessageManager from '../Message/Manager/IMessageManager';

class RequestAdapter {
    constructor(app: express.Application, manager: IMessageManager) {
        app.post('/', (req: express.Request & bodyParser.ParsedAsJson, res: express.Response) => {
            /*if (req.hostname !== process.env.CALLBACK_ADDR) {
                res.sendStatus(400);
                return;
            }*/

            const rawMessage = Object.assign(
                {},
                req.body,
                {
                    Reply: (content: String) => {
                        res.json({
                            reply: content
                        });
                    },
                    Dispose: () => {
                        res.end();
                    }
                }
            ) as IMessage;

            manager.ProcessMessage(rawMessage);
        });
    }
}

export default RequestAdapter;