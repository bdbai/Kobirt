enum HandleResult {
    // 消息未处理
    Skipped = 0,
    // 消息已处理
    Handled = 1,
    // 处理并改变了原消息
    Changed = 2
}

export default HandleResult;