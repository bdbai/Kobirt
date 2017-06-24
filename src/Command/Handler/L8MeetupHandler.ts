import LoggedinHandlerBase from './LoggedinHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import AgentQq from '../../Model/AgentQq';
import L8Meetup from '../../Model/L8Meetup';
import BadCommand from '../Error/BadCommand';

class DoneHandler extends LoggedinHandlerBase {
    public Prefix = '耶';

    public async processUserCommand(command: Command, user: AgentQq) {
        const meetups = await L8Meetup.fetchFromGroup(command.Message.group_id);
        if (meetups.length === 0) throw new BadCommand('咱能先起八不', command);

        command.Message.Reply(
            `起八完成！${meetups.length < 8 ? '人不够，毒来凑！' : '嘿嘿~'}参与人员：
${meetups.map(i => '@' + i.AgentQq.AgentId).join('\r\n')}`
        );
        await L8Meetup.destroyAll(meetups);
        return HandleResult.Handled;
    }
}

class ExitHandler extends LoggedinHandlerBase {
    public Prefix = '算了吧';

    public async processUserCommand(command: Command, user: AgentQq) {
        const group_uid = command.Message.group_id;
        const group = group_uid.toString();
        const meetups = await L8Meetup.fetchFromQq(user);
        const thisMeetup = meetups.find(i => i.Group === group);
        if (!thisMeetup) {
            throw new BadCommand(`别捣乱，${user.AgentId}！`, command);
        }

        await thisMeetup.destroy();
        command.Message.Reply(`啊呀，${user.AgentId} 不来了！`);

        return HandleResult.Handled
    }
}

class AddHandler extends LoggedinHandlerBase {
    public Prefix = '带上我';

    public async processUserCommand(command: Command, user: AgentQq) {
        const group_uid = command.Message.group_id;
        const group = group_uid.toString();
        const meetups = await L8Meetup.fetchFromQq(user);
        if (meetups.find(i => i.Group === group)) {
            throw new BadCommand(`已经带上 ${user.AgentId} 啦`, command);
        }

        await L8Meetup.addQqToMeetup(user, group_uid);
        command.Message.Reply(`好的，一定带上 ${user.AgentId}！`);

        return HandleResult.Handled
    }
}

export default class L8MeetupHandler extends LoggedinHandlerBase {
    private tips = (aprefix: string) =>
        `指令：
${aprefix} 带上我 - 加入起八
${aprefix} 算了吧 - 退出起八
${aprefix} 耶 - 完成起八`;

    public Prefix = [ '起八', '起七', '起九' ];

    protected acceptFriendMessage = false;

    public async processUserCommand(command: Command, user: AgentQq) {
        const meetups = await L8Meetup.fetchFromGroup(command.Message.group_id);
        if (meetups.length > 0) {
            // Display this L8Meetup
            const len = meetups.length;
            command.Message.Reply(
                `起八状态：人${len >= 8 ? '齐了' : '没齐'}（${len}/8）
${meetups.map(i => '@' + i.AgentQq.AgentId).join('\r\n')}
${this.tips(`${command.GetAccumulatedPrefix()} ${command.GetCurrentContent(this.Prefix)}`)}`
            );
        } else {
            // Create a new L8Meetup
            await L8Meetup.addQqToMeetup(user, command.Message.group_id);
            command.Message.Reply(
                `${user.AgentId} 发起了起八！其他人可以发${this.tips(`${command.GetAccumulatedPrefix()} ${command.GetCurrentContent(this.Prefix)}`)}`
            );
        }

        return HandleResult.Handled;
    }

    constructor() {
        super();

        this
            .RegisterSubHandler(new AddHandler())
            .RegisterSubHandler(new ExitHandler())
            .RegisterSubHandler(new DoneHandler());
    }
}