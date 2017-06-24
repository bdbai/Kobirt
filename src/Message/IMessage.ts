interface IMessage {
    message: string,
    user_id: number,
    // group: string,
    group_id: number,
    message_type: string,
    post_type: string,

    // event?: string,
    // params?: any,

    Reply(content: string): any
    Dispose(): any
}

export default IMessage;