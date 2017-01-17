import * as AV from 'leancloud-storage';
import AVProperty from './AVProperty';
import AgentQq from './AgentQq';
import L8Meetup from './L8Meetup';

export default class QqGroup extends AV.Object {

    @AVProperty()
    Qq: AgentQq;

    @AVProperty()
    Group: string;

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
    static async destroyQq(qq: AgentQq) {
        const groups = await QqGroup.fetchJoinedGroups(qq);
        return await AV.Object.destroyAll(groups);
    }
}

AV.Object.register(QqGroup);