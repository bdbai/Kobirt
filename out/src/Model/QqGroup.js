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
class QqGroup extends AV.Object {
    static async fetchMemberList(group) {
        const q = new AV.Query(QqGroup);
        q.equalTo('Group', group.toString());
        return await q.find();
    }
    static async fetchJoinedGroups(qq) {
        const q = new AV.Query(QqGroup);
        q.equalTo('Qq', qq);
        return await q.find();
    }
    static async findQqGroup(qq, group) {
        const q = new AV.Query(QqGroup);
        q.equalTo('Qq', qq);
        q.equalTo('Group', group.toString());
        return await q.first() || null;
    }
    static async fetchAgentIds() {
        const q = new AV.Query(QqGroup);
        q.include('AgentQq.AgentId');
        const all = await q.find();
        const distinctMap = new Map();
        all.forEach(i => distinctMap.set(i.Qq.AgentId, true));
        return Array.from(distinctMap.keys());
    }
    static async fetchGroups() {
        const q = new AV.Query(QqGroup);
        const all = await q.find();
        const distinctMap = new Map();
        all.forEach(i => distinctMap.set(i.Group, true));
        return Array.from(distinctMap.keys());
    }
    static async fetchAllAgentQqs() {
        const q = new AV.Query(QqGroup);
        q.include('Qq');
        return await q.find();
    }
    static async addMemberToList(qq, group) {
        const obj = new QqGroup();
        obj.Qq = qq;
        obj.Group = group.toString();
        return await obj.save();
    }
    static async destroyQq(qq) {
        const groups = await QqGroup.fetchJoinedGroups(qq);
        return await AV.Object.destroyAll(groups);
    }
}
__decorate([
    AVProperty_1.default()
], QqGroup.prototype, "Qq", void 0);
__decorate([
    AVProperty_1.default()
], QqGroup.prototype, "Group", void 0);
exports.default = QqGroup;
AV.Object.register(QqGroup);
//# sourceMappingURL=QqGroup.js.map