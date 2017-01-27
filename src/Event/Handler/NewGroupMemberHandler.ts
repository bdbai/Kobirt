import { NewGroupMemberEvent } from '../IEvents';
import { SendGroupMessage } from '../../Webqq/API';

const NewGroupMemberHandler: NewGroupMemberEvent = (friend, group) => {
    SendGroupMessage(group.uid.toString(), `欢迎新人 ${friend.name}！
重要：过马路时千万不要看手机！！！
萌新请先阅读群共享中的《萌新入门宝典》
加我好友绑定 Ingress 账户，参与互动

记得膜 K~`);
}

export default NewGroupMemberHandler;