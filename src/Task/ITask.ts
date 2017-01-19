interface ITask {
    Name: string,
    Pattern: string,
    DoWork(): Promise<void>
}

export default ITask;