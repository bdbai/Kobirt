import IMessage from '../Message/IMessage';
import IEventDispatcher from './IEventDispatcher';

import NewFriendHandler from './Handler/NewFriendHandler';
import LoseFriendHandler from './Handler/LoseFriendHandler';
import NewGroupMemberHandler from './Handler/NewGroupMemberHandler';
import LoseGroupMemberHandler from './Handler/LoseGroupMemberHandler';

const EventDispatcher: IEventDispatcher = (message: IMessage) => {
    switch (message.event) {
        case 'new_friend':
            NewFriendHandler(message.param[0]);
            break;
        case 'lose_friend':
            LoseFriendHandler(message.param[0]);
            break;
        case 'new_group_member':
            NewGroupMemberHandler(message.param[0], message.param[1]);
            break;
        case 'lose_group_member':
            LoseGroupMemberHandler(message.param[0], message.param[1]);
            break;
    }
}

export default EventDispatcher;