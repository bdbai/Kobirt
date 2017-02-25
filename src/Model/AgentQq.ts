import * as AV from 'leancloud-storage';
import AVProperty from './AVProperty';
import QqGroup from './QqGroup';
import L8Meetup from './L8Meetup';

export default class AgentQq extends AV.Object {

    @AVProperty()
    Qq: string;

    @AVProperty()
    AgentId: string;

    @AVProperty()
    LastAp: number;

    public static async checkUserByQq(qq: number): Promise<AgentQq> {
        const q = new AV.Query(AgentQq);
        q.equalTo('Qq', qq.toString());
        return await q.first() as AgentQq;
    }
    public static async checkUserByAgentId(agentId: string): Promise<AgentQq> {
        const q = new AV.Query(AgentQq);
        q.equalTo('AgentId', agentId);
        return await q.first() as AgentQq;
    }
    public async unbind(): Promise<{}> {
        await QqGroup.destroyQq(this);
        await L8Meetup.destoryQq(this);
        return await this.destroy();
    }
    public static async bindUserByQq(qq: number, agentId: string): Promise<AgentQq> {
        const obj = new AgentQq();
        obj.Qq = qq.toString();
        obj.AgentId = agentId;
        return await obj.save() as AgentQq;
    }
}

AV.Object.register(AgentQq);