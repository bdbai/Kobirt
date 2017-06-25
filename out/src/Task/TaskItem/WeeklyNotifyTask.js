"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QqGroup_1 = require("../../Model/QqGroup");
const CoolQRichMessage_1 = require("../../Message/Rich/CoolQRichMessage");
const TextSegment_1 = require("../../Message/Rich/TextSegment");
class WeeklyNotifyTask {
    constructor(message) {
        this.message = message;
        this.Name = 'WeeklyNotify:' + this.message;
        this.Pattern = '0 0 20 * * 0';
    }
    async DoWork() {
        const groups = await QqGroup_1.default.fetchGroups();
        const richMessage = new CoolQRichMessage_1.default();
        richMessage.AddSegment(new TextSegment_1.default(this.message));
        groups
            .map(g => parseInt(g))
            .forEach(group => richMessage.SendToGroup(group));
    }
}
exports.default = WeeklyNotifyTask;
//# sourceMappingURL=WeeklyNotifyTask.js.map