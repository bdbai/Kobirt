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
class L8Meetup extends AV.Object {
    static async fetchFromQq(user) {
        const q = new AV.Query(L8Meetup);
        q.equalTo('AgentQq', user);
        return await q.find();
    }
    static async fetchFromGroup(group) {
        const q = new AV.Query(L8Meetup);
        q.equalTo('Group', group.toString());
        q.include('AgentQq');
        return await q.find();
    }
    static async addQqToMeetup(user, group) {
        const obj = new L8Meetup();
        obj.AgentQq = user;
        obj.Group = group.toString();
        return await obj.save();
    }
    static async destoryQq(user) {
        const meets = await L8Meetup.fetchFromQq(user);
        return await AV.Object.destroyAll(meets);
    }
}
__decorate([
    AVProperty_1.default()
], L8Meetup.prototype, "AgentQq", void 0);
__decorate([
    AVProperty_1.default()
], L8Meetup.prototype, "Group", void 0);
exports.default = L8Meetup;
AV.Object.register(L8Meetup);
//# sourceMappingURL=L8Meetup.js.map