import IMessage from '../Message/IMessage';
import IEventDispatcher from './IEventDispatcher';

import NewFriendHandler from './Handler/NewFriendHandler';
import LoseFriendHandler from './Handler/LoseFriendHandler';
import NewGroupMemberHandler from './Handler/NewGroupMemberHandler';
import LoseGroupMemberHandler from './Handler/LoseGroupMemberHandler';

const EventDispatcher: IEventDispatcher = (message: IMessage) => {
    /*switch (message.event) {
        case 'new_friend':
            NewFriendHandler(message.params[0]);
            break;
        case 'lose_friend':
            LoseFriendHandler(message.params[0]);
            break;
        case 'new_group_member':
            NewGroupMemberHandler(message.params[0], message.params[1]);
            break;
        case 'lose_group_member':
            LoseGroupMemberHandler(message.params[0], message.params[1]);
            break;
    }*/
    message.Dispose();
}

export default EventDispatcher;
