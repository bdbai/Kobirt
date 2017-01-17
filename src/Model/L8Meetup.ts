import * as AV from 'leancloud-storage';
import AVProperty from './AVProperty';
import AgentQq from './AgentQq';

export default class L8Meetup extends AV.Object {

    @AVProperty()
    AgentQq: AgentQq;

    @AVProperty()
    Group: string;

    static async fetchFromQq(user: AgentQq) {
        const q = new AV.Query(L8Meetup);
        q.equalTo('AgentQq', user);
        return await q.find() as Array<L8Meetup>;
    }
    static async fetchFromGroup(group: number) {
        const q = new AV.Query(L8Meetup);
        q.equalTo('Group', group.toString());
        q.include('AgentQq');
        return await q.find() as Array<L8Meetup>;
    }
    static async addQqToMeetup(user: AgentQq, group: number) {
        const obj = new L8Meetup();
        obj.AgentQq = user;
        obj.Group = group.toString();
        return await obj.save();
    }
    static async destoryQq(user: AgentQq) {
        const meets = await L8Meetup.fetchFromQq(user);
        return await AV.Object.destroyAll(meets);
    }
}

AV.Object.register(L8Meetup);