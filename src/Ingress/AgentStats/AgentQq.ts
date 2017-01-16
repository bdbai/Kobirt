import * as AV from 'leancloud-storage';
import { fetchShareFromList } from './ShareAPI';

export default class AgentQq extends AV.Object {
    get Qq() {
        return this.get('Qq');
    }
    set Qq(value: string) {
        this.set('Qq', value);
    }

    get AgentId() {
        return this.get('AgentId');
    }
    set AgentId(value: string) {
        this.set('AgentId', value);
    }

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
        return await this.destroy();
    }
    public static async bindUserByQq(qq: number, agentId: string): Promise<AgentQq> {
        const users = await fetchShareFromList();
        if (!users.find(i => i === agentId)) throw new Error('我好像找不到你诶。你把 AgentStats 资料分享给 Kobirt 了吗？');
        const obj = new AgentQq();
        obj.Qq = qq.toString();
        obj.AgentId = agentId;
        return await obj.save() as AgentQq;
    }
}

AV.Object.register(AgentQq);