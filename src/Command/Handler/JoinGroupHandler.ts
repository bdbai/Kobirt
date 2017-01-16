import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import AgentQq from '../../Ingress/AgentStats/AgentQq';
import QqGroup from '../../Ingress/AgentStats/QqGroup';

class ExitGroupHandler extends CommandHandlerBase {
    public Prefix = '算了吧';

    public async processCommand(command: Command): Promise<HandleResult> {
        let user: AgentQq;
        try {
            user = await AgentQq.checkUserByQq(command.Message.sender_uid);
            if (!user) throw new Error('别捣乱QAQ');

            const qqGroup = await QqGroup.findQqGroup(user, command.Message.group_uid);
            if (!qqGroup) throw new Error('你还没诶嘿呢');

            await qqGroup.destroy();
            command.Message.Reply('好吧，再见朋友QAQ');
        } catch (err) {
            return this.handleError(err, command);
        }
    }
}

export default class JoinGroupHandler extends CommandHandlerBase {
    public Prefix = '诶嘿';

    public accepted = (command: Command) =>
        command.StartsWith(this.Prefix) &&
        !!command.Message.group;

    public async processCommand(command: Command): Promise<HandleResult> {
        const thisGroup = command.Message.group_uid.toString();
        let user: AgentQq;
        try {
            user = await AgentQq.checkUserByQq(command.Message.sender_uid);
            if (!user) throw new Error('别捣乱QAQ');

            const qqGroup = await QqGroup.findQqGroup(user, command.Message.group_uid);
            if (qqGroup) throw new Error(`我认识你，${user.AgentId}！`);

            await QqGroup.addMemberToList(user, command.Message.group_uid);
            command.Message.Reply(`${user.AgentId} 我记住你了。下次排行榜会算上你的。
后悔的话请说 ${command.AccumulatedPrefixes} ${this.Prefix} 算了吧`);
        } catch (err) {
            return this.handleError(err, command);
        }
        return HandleResult.Handled;
    }

    constructor() {
        super();

        this
            .RegisterSubHandler(new ExitGroupHandler());
    }
}