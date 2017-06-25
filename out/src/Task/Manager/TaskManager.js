"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Schedule = require("node-schedule");
class TaskManager {
    constructor(...tasks) {
        this._tasks = new Array();
        tasks.forEach(i => this.AddTask(i));
    }
    AddTask(task) {
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
exports.default = TaskManager;
//# sourceMappingURL=TaskManager.js.map