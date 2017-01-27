import { NewFriendEvent } from '../IEvents';
import { SendFriendMessage } from '../../Webqq/API';

const NewFriendHandler: NewFriendEvent = (friend) => {
    SendFriendMessage(friend.uid.toString(), `Hello ${friend.name}!
请给我发 K 绑定 完成账户绑定工作，对我说 K help 查看所有可用命令`);
}

export default NewFriendHandler;