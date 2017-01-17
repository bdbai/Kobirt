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
class QqGroup extends AV.Object {
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
    static destroyQq(qq) {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = yield QqGroup.fetchJoinedGroups(qq);
            return yield AV.Object.destroyAll(groups);
        });
    }
}
__decorate([
    AVProperty_1.default()
], QqGroup.prototype, "Qq", void 0);
__decorate([
    AVProperty_1.default()
], QqGroup.prototype, "Group", void 0);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QqGroup;
AV.Object.register(QqGroup);
//# sourceMappingURL=QqGroup.js.map