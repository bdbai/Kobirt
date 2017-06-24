"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const AV = require("leancloud-storage");
const AVProperty_1 = require("./AVProperty");
const QqGroup_1 = require("./QqGroup");
const L8Meetup_1 = require("./L8Meetup");
class AgentQq extends AV.Object {
    static async checkUserByQq(qq) {
        const q = new AV.Query(AgentQq);
        q.equalTo('Qq', qq.toString());
        return await q.first();
    }
    static async checkUserByAgentId(agentId) {
        const q = new AV.Query(AgentQq);
        q.equalTo('AgentId', agentId);
        return await q.first();
    }
    async unbind() {
        await QqGroup_1.default.destroyQq(this);
        await L8Meetup_1.default.destoryQq(this);
        return await this.destroy();
    }
    static async bindUserByQq(qq, agentId) {
        const obj = new AgentQq();
        obj.Qq = qq.toString();
        obj.AgentId = agentId;
        return await obj.save();
    }
    static async fetchAllAgentQqs() {
        const q = new AV.Query(AgentQq);
        return await q.find();
    }
}
__decorate([
    AVProperty_1.default()
], AgentQq.prototype, "Qq", void 0);
__decorate([
    AVProperty_1.default()
], AgentQq.prototype, "AgentId", void 0);
__decorate([
    AVProperty_1.default()
], AgentQq.prototype, "LastAp", void 0);
__decorate([
    AVProperty_1.default()
], AgentQq.prototype, "LastMu", void 0);
exports.default = AgentQq;
AV.Object.register(AgentQq);
//# sourceMappingURL=AgentQq.js.map