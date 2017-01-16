import * as AV from 'leancloud-storage';
import AgentQq from './AgentQq';

export default class QqGroup extends AV.Object {
    get Qq() {
        return this.get('Qq');
    }
    set Qq(value: AgentQq) {
        this.set('Qq', value);
    }

    get Group() {
        return this.get('Group');
    }
    set Group(value: string) {
        this.set('Group', value);
    }

    static async fetchMemberList(group: number) {
        const q = new AV.Query(QqGroup);
        q.equalTo('Group', group.toString());
        return await q.find() as Array<QqGroup>;
    }
    static async fetchJoinedGroups(qq: AgentQq) {
        const q = new AV.Query(QqGroup);
        q.equalTo('Qq', qq);
        return await q.find() as Array<QqGroup>;
    }
    static async findQqGroup(qq: AgentQq, group: number) {
        const q = new AV.Query(QqGroup);
        q.equalTo('Qq', qq);
        q.equalTo('Group', group.toString());
        return await q.first() as QqGroup || null;
    }
    static async addMemberToList(qq: AgentQq, group: number) {
        const obj = new QqGroup();
        obj.Qq = qq;
        obj.Group = group.toString();
        return await obj.save() as QqGroup;
    }
}

AV.Object.register(QqGroup);