interface IMessage {
    id: number,
    class: string,
    time: number,
    content: string,
    sender: string,
    sender_id: number,
    sender_uid: number,
    receiver: string,
    receiver_id: number,
    receiver_uid: number,
    group: string,
    group_id: number,
    group_uid: number,
    type: string,
    post_type: string,

    Reply: (content: String) => any
    Dispose: () => any
}

export default IMessage;