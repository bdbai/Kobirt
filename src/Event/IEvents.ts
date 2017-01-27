import IFriend from './Model/IFriend';
import IGroup from './Model/IGroup';

export interface NewFriendEvent {
    (friend: IFriend): void;
}

export interface LoseFriendEvent {
    (friend: IFriend): void;
}

export interface NewGroupMemberEvent {
    (friend: IFriend, group: IGroup): void;
}

export interface LoseGroupMemberEvent {
    (friend: IFriend, group: IGroup): void;
}