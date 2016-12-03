interface IMessage {
    msg_time: string;
    content: string,
    msg_class: string,
    sender: string,
    sender_id: string,
    sender_qq: string,
    receiver: string,
    receiver_id: string,
    receiver_qq: string,
    group: string,
    group_id: string,
    gnumber: string,
    msg_id: string,
    type: string,

    Reply: (content: String) => any
    Dispose: () => any
}

export default IMessage;