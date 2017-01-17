import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';

export default class HelpHandler extends CommandHandlerBase {
    public Prefix = 'help';

    public async processCommand(command: Command): Promise<HandleResult> {
        const aprefix = command.GetAccumulatedPrefix();
        if (command.Message.group) {
            command.Message.Reply(
`Hello! 我是 Kobirt。请用指令告诉我您想做什么：
${aprefix} help - 输出这条信息
${aprefix} 得瑟 - 显示统计信息
${aprefix} 诶嘿 - 参与群组排行榜
${aprefix} 起八 - 发起/查看起八统计
`);
        } else {
            command.Message.Reply(`Kobirt 命令列表:
${aprefix} help - 输出这条消息
${aprefix} 得瑟 - 显示统计信息
${aprefix} 账户 - 有关 Ingress 和 AgentStats 的绑定、查询等`);
        }
        return HandleResult.Handled;
    }
}