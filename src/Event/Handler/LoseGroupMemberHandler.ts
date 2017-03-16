import { LoseGroupMemberEvent } from '../IEvents';
import { SendGroupMessage } from '../../Webqq/API';

const LoseGroupMemberHandler: LoseGroupMemberEvent = (friend, group) => {
    SendGroupMessage(group.uid.toString(), `啊呀，${
        friend.uid === 80000000
        ? '有人'
        : `${friend.name} (${friend.uid.toString()}) `
    }退群了！`);
}

export default LoseGroupMemberHandler;