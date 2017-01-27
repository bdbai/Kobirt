import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import { fetchShareFromList } from '../../Ingress/AgentStats/ShareAPI';
import AgentQq from '../../Model/AgentQq';
import BadCommand from '../Error/BadCommand';

export default class BindHandler extends CommandHandlerBase {
    public Prefix = '绑定';

    public async processCommand(command: Command): Promise<HandleResult> {
        const id = command.GetSubCommand(this.Prefix).Content;
        if (id === '') {
            command.Message.Reply(`绑定只需两步：
1. 登录 www.agent-stats.com，在“我的共享列表”中将个人资料分享给 Kobirt
2. 给我发指令 ${command.GetAccumulatedPrefix()} ${this.Prefix} 加你的 ID`);
            return HandleResult.Handled;
        }

        const userByQQ = await AgentQq.checkUserByQq(command.Message.sender_uid);
        if (userByQQ) throw new BadCommand('已经绑定过了哟', command);

        const userById = await AgentQq.checkUserByAgentId(id);
        if (userById) throw new BadCommand('不行哦~', command);

        const knownUsers = await fetchShareFromList();
        if (!knownUsers.find(i => i === id)) throw new BadCommand('我好像找不到你诶。你把 AgentStats 资料分享给 Kobirt 了吗？', command);

        const agentQq = await AgentQq.bindUserByQq(command.Message.sender_uid, id);
        command.Message.Reply('绑定完成！接下来请到群中发指令 K 诶嘿 参与该群特工排行榜')
        return HandleResult.Handled;
    }
}
