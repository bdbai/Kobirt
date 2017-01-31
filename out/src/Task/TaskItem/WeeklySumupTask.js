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
const ShareAPI_1 = require("../../Ingress/AgentStats/ShareAPI");
const API_1 = require("../../Webqq/API");
class WeeklySumupTask {
    constructor() {
        this.Name = '每周统计';
        this.Pattern = '0 0 21 * * 0';
    }
    processGroup(groupUid, qqs, agents) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = Array();
            for (const qq of qqs) {
                let agent;
                try {
                    agent = yield agents.get(qq.AgentId);
                }
                catch (err) {
                    console.log(err);
                    continue;
                }
                const ap = agent.Medals.find(i => i.name === 'ap');
                const mu = agent.Medals.find(i => i.name === 'illuminator');
                data.push({
                    name: agent.AgentId,
                    data: {
                        weekAp: ap.progression.week,
                        weekMu: mu.progression.week
                    }
                });
            }
            let message = '';
            // AP
            data.sort((a, b) => b.data.weekAp - a.data.weekAp);
            message += '本周特工ap排行榜：\n' +
                data.map(i => `@${i.name} ${i.data.weekAp}`).join('\n');
            message += '\n\n';
            // MU
            data.sort((a, b) => b.data.weekMu - a.data.weekMu);
            message += '本周特工mu排行榜：\n' +
                data.map(i => `@${i.name} ${i.data.weekAp}`).join('\n');
            message += '\n\n排行榜仅供娱乐';
            API_1.SendGroupMessage(groupUid, message);
        });
    }
    DoWork() {
        return __awaiter(this, void 0, void 0, function* () {
            // 所有特工信息
            const agents = new Map();
            // 群
            const groups = new Map();
            const qqGroups = yield QqGroup_1.default.fetchAllAgentQqs();
            for (const qqGroup of qqGroups) {
                // 把用户分类进群
                const group = groups.get(qqGroup.Group);
                if (!group) {
                    groups.set(qqGroup.Group, [qqGroup.Qq]);
                }
                else {
                    group.push(qqGroup.Qq);
                }
                // 异步获取特工信息（并发）
                if (!agents.has(qqGroup.Qq.AgentId)) {
                    agents.set(qqGroup.Qq.AgentId, ShareAPI_1.loadUserFromId(qqGroup.Qq.AgentId));
                }
            }
            Array.from(groups.keys())
                .forEach(i => this.processGroup(i, groups.get(i), agents));
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WeeklySumupTask;
//# sourceMappingURL=WeeklySumupTask.js.map