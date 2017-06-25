import ITask from '../ITask';
import QqGroup from '../../Model/QqGroup';
import CoolQRichMessage from '../../Message/Rich/CoolQRichMessage';
import TextSegment from '../../Message/Rich/TextSegment';

export default class WeeklyNotifyTask implements ITask {

    constructor(private message: string) { }

    public Name = 'WeeklyNotify:' + this.message;
    public Pattern = '0 0 20 * * 0';

    public async DoWork() {
        const groups = await QqGroup.fetchGroups();
        const richMessage = new CoolQRichMessage();
        richMessage.AddSegment(new TextSegment(this.message));
        groups
            .map(g => parseInt(g))
            .forEach(group => richMessage.SendToGroup(group));
    }
}