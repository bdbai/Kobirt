"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const AV = require("leancloud-storage");
const ShareAPI_1 = require("./ShareAPI");
class AgentQq extends AV.Object {
    get Qq() {
        return this.get('Qq');
    }
    set Qq(value) {
        this.set('Qq', value);
    }
    get AgentId() {
        return this.get('AgentId');
    }
    set AgentId(value) {
        this.set('AgentId', value);
    }
    static checkUserByQq(qq) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = new AV.Query(AgentQq);
            q.equalTo('Qq', qq);
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
            return yield this.destroy();
        });
    }
    static bindUserByQq(qq, agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ShareAPI_1.loadUserFromId(agentId);
            const obj = new AgentQq();
            obj.Qq = qq;
            obj.AgentId = user.AgentId;
            return yield obj.save();
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgentQq;
AV.Object.register(AgentQq);
//# sourceMappingURL=AgentQq.js.map