import LoggedinHandlerBase from './LoggedinHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import AgentQq from '../../Model/AgentQq';
import QqGroup from '../../Model/QqGroup';
import BadCommand from '../Error/BadCommand';

class ExitGroupHandler extends LoggedinHandlerBase {
    public Prefix = '算了吧';

    public async processUserCommand(command: Command, user: AgentQq): Promise<HandleResult> {
        try {
            const qqGroup = await QqGroup.findQqGroup(user, command.Message.group_uid);
            if (!qqGroup) throw new BadCommand('你还没诶嘿呢', command);

            await qqGroup.destroy();
            command.Message.Reply('好吧，再见朋友QAQ');
        } catch (err) {
            return this.handleError(err, command);
        }
    }
}

export default class JoinGroupHandler extends LoggedinHandlerBase {
    public Prefix = '诶嘿';

    public accepted = (command: Command) =>
        command.StartsWith(this.Prefix) &&
        !!command.Message.group;

    public async processUserCommand(command: Command, user: AgentQq): Promise<HandleResult> {
        const thisGroup = command.Message.group_uid.toString();
        try {
            const qqGroup = await QqGroup.findQqGroup(user, command.Message.group_uid);
            if (qqGroup) throw new BadCommand(`我认识你，${user.AgentId}！`, command);

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