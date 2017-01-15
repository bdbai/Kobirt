import * as AV from 'leancloud-storage';
import { loadUserFromId } from './ShareAPI';

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

    public static async checkUserByQq(qq: string): Promise<AgentQq> {
        const q = new AV.Query(AgentQq);
        q.equalTo('Qq', qq);
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
    public static async bindUserByQq(qq: string, agentId: string): Promise<AgentQq> {
        const user = await loadUserFromId(agentId);
        const obj = new AgentQq();
        obj.Qq = qq;
        obj.AgentId = user.AgentId;
        return await obj.save() as AgentQq;
    }
}

AV.Object.register(AgentQq);
