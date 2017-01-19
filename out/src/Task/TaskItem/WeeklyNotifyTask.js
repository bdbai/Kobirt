"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const QqGroup_1 = require("../../Model/QqGroup");
const API_1 = require("../../Webqq/API");
class WeeklyNotifyTask {
    constructor(message) {
        this.message = message;
        this.Name = 'WeeklyNotify:' + this.message;
        this.Pattern = '0 30 21 * * *';
    }
    DoWork() {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = yield QqGroup_1.default.fetchGroups();
            groups.forEach(group => API_1.SendGroupMessage(group, this.message));
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WeeklyNotifyTask;
//# sourceMappingURL=WeeklyNotifyTask.js.map