import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import AgentQq from '../../Ingress/AgentStats/AgentQq';

class WhoAmIHandler extends CommandHandlerBase {
    public Prefix = '我是谁';

    public async processCommand(command: Command): Promise<HandleResult> {
        try {
            const user = await AgentQq.checkUserByQq(command.Message.sender_uid);
            if (user) {
                command.Message.Reply(`啊哈！你就是特工 ${user.AgentId} ！`);
            } else {
                command.Message.Reply('我好像不认识你诶。请先用指令绑定你的游戏 ID。');
            }
        } catch (err) {
            this.handleError(err, command);
        }
        return HandleResult.Handled;
    }
}

class BindHandler extends CommandHandlerBase {
    public Prefix = '绑定';

    public async processCommand(command: Command): Promise<HandleResult> {
        const id = command.GetSubCommand(this.Prefix).Content;
        if (id === '') {
            command.Message.Reply(`绑定只需两步：
1. 登录 www.agent-stats.com，在“我的共享列表”中将个人资料分享给 Kobirt
2. 给我发指令 ${command.GetAccumulatedPrefix()} ${this.Prefix} 加你的 ID`);
            return HandleResult.Handled;
        }
        try {
            const userById = await AgentQq.checkUserByAgentId(id);
            const userByQQ = await AgentQq.checkUserByQq(command.Message.sender_uid);
            if (userByQQ) {
                command.Message.Reply('已经绑定过了哟');
                return HandleResult.Handled;
            }
            if (userById) {
                command.Message.Reply('不行哦~');
                return HandleResult.Handled;
            }

            const agentQq = await AgentQq.bindUserByQq(command.Message.sender_uid, id);
            command.Message.Reply('绑定完成！接下来请到群中发指令 K 诶嘿 参与该群特工排行榜')

        } catch (err) {
            this.handleError(err, command);
        }
        return HandleResult.Handled;
    }
}

class UnbindHandler extends CommandHandlerBase {
    public Prefix = '注销';

    public async processCommand(command: Command): Promise<HandleResult> {
        try {
            const userByQQ = await AgentQq.checkUserByQq(command.Message.sender_uid);
            if (!userByQQ) {
                command.Message.Reply('你还没绑定呢');
                return HandleResult.Handled;
            }
            await userByQQ.unbind();
            command.Message.Reply('再见QAQ\r\n记得到 AgentStats 网站取消分享哦~');
        } catch (err) {
            this.handleError(err, command);
        }
        return HandleResult.Handled;
    }
}

export default class AccountHandler extends CommandHandlerBase {
    public Prefix = '账户';

    public accepted = (command: Command) => 
        command.StartsWith(this.Prefix) &&
        !command.Message.group;

    constructor() {
        super();
        this
            .RegisterSubHandler(new WhoAmIHandler())
            .RegisterSubHandler(new BindHandler())
            .RegisterSubHandler(new UnbindHandler());
    }

    public async processCommand(command: Command): Promise<HandleResult> {
        const aprefix = command.GetAccumulatedPrefix() + ' ' + this.Prefix;
        command.Message.Reply(
`${aprefix} 我是谁 - 输出已经绑定的特工 ID
${aprefix} 绑定 - 绑定 AgentStats
${aprefix} 注销 - 解除绑定 AgentStats`);
        return HandleResult.Handled;
    }
}