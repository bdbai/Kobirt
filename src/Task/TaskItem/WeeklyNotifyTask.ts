import ITask from '../ITask';
import QqGroup from '../../Model/QqGroup';
import { SendGroupMessage } from '../../Webqq/API';

export default class WeeklyNotifyTask implements ITask {

    constructor(private message: string) { }

    public Name = 'WeeklyNotify:' + this.message;
    public Pattern = '0 0 20 * * 0';

    public async DoWork() {
        const groups = await QqGroup.fetchGroups();
        groups.forEach(group => SendGroupMessage(group, this.message));
    }
}