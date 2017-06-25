"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestAdapter {
    constructor(app, manager) {
        app.post('/', (req, res) => {
            /*if (req.hostname !== process.env.CALLBACK_ADDR) {
                res.sendStatus(400);
                return;
            }*/
            if (req.body.message instanceof Array) {
                req.body.message = req.body.message
                    .filter(seg => seg.type === 'text')
                    .map(seg => seg.data.text)
                    .join('');
            }
            const rawMessage = Object.assign({}, req.body, {
                Reply: (content) => {
                    res.json({
                        reply: content
                    });
                },
                Dispose: () => {
                    res.end();
                }
            });
            manager.ProcessMessage(rawMessage);
        });
    }
}
exports.default = RequestAdapter;
//# sourceMappingURL=RequestAdapter.js.map