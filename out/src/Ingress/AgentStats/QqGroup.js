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
class QqGroup extends AV.Object {
    get Qq() {
        return this.get('Qq');
    }
    set Qq(value) {
        this.set('Qq', value);
    }
    get Group() {
        return this.get('Group');
    }
    set Group(value) {
        this.set('Group', value);
    }
    static fetchMemberList(group) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = new AV.Query(QqGroup);
            q.equalTo('Group', group.toString());
            return yield q.find();
        });
    }
    static fetchJoinedGroups(qq) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = new AV.Query(QqGroup);
            q.equalTo('Qq', qq);
            return yield q.find();
        });
    }
    static findQqGroup(qq, group) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = new AV.Query(QqGroup);
            q.equalTo('Qq', qq);
            q.equalTo('Group', group.toString());
            return (yield q.first()) || null;
        });
    }
    static addMemberToList(qq, group) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = new QqGroup();
            obj.Qq = qq;
            obj.Group = group.toString();
            return yield obj.save();
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QqGroup;
AV.Object.register(QqGroup);
//# sourceMappingURL=QqGroup.js.map