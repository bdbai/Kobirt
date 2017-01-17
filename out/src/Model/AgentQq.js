"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const AV = require("leancloud-storage");
const AVProperty_1 = require("./AVProperty");
const QqGroup_1 = require("./QqGroup");
const L8Meetup_1 = require("./L8Meetup");
class AgentQq extends AV.Object {
    static checkUserByQq(qq) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = new AV.Query(AgentQq);
            q.equalTo('Qq', qq.toString());
            return yield q.first();
        });
    }
    static checkUserByAgentId(agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = new AV.Query(AgentQq);
            q.equalTo('AgentId', agentId);
            return yield q.first();
        });
    }
    unbind() {
        return __awaiter(this, void 0, void 0, function* () {
            yield QqGroup_1.default.destroyQq(this);
            yield L8Meetup_1.default.destoryQq(this);
            return yield this.destroy();
        });
    }
    static bindUserByQq(qq, agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = new AgentQq();
            obj.Qq = qq.toString();
            obj.AgentId = agentId;
            return yield obj.save();
        });
    }
}
__decorate([
    AVProperty_1.default()
], AgentQq.prototype, "Qq", void 0);
__decorate([
    AVProperty_1.default()
], AgentQq.prototype, "AgentId", void 0);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgentQq;
AV.Object.register(AgentQq);
//# sourceMappingURL=AgentQq.js.map