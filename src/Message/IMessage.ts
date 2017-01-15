interface IMessage {
    id: number,
    class: string,
    time: string,
    content: string,
    sender: string,
    sender_id: string,
    sender_uid: string,
    receiver: string,
    receiver_id: string,
    receiver_uid: string,
    group: string,
    group_id: string,
    group_uid: string,
    type: string,
    post_type: string,

    Reply: (content: String) => any
    Dispose: () => any
}

export default IMessage;