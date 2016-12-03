"use strict";
class RequestAdapter {
    constructor(app, manager) {
        app.post('/', (req, res) => {
            /*if (req.hostname !== process.env.CALLBACK_ADDR) {
                res.sendStatus(400);
                return;
            }*/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequestAdapter;
//# sourceMappingURL=RequestAdapter.js.map