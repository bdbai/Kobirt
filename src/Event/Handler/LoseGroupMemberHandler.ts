import { LoseGroupMemberEvent } from '../IEvents';
import { SendGroupMessage } from '../../Webqq/API';

const LoseGroupMemberHandler: LoseGroupMemberEvent = (friend, group) => {
    SendGroupMessage(group.uid.toString(), `啊呀，${friend.name} 退群了！`);
}

export default LoseGroupMemberHandler;