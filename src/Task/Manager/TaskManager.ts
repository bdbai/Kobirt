import ITask from '../ITask';
import ITaskManager from './ITaskManager';
import * as Schedule from 'node-schedule';

export default class TaskManager {
    private _tasks = new Array<ITask>();
    constructor(...tasks) {
        tasks.forEach(i => this.AddTask(i));
    }

    public AddTask(task: ITask) {
        this._tasks.push(task);
        Schedule.scheduleJob(task.Pattern, () => {
            console.log('Running task: ' + task.Name);
            task
                .DoWork()
                .then(() => {
                    console.log('Task finished: ' + task.Name);
                })
                .catch(err => {
                    console.log('Task failed: ' + task.Name);
                    console.log(err);
                });
        });
    }
}