import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '../interfaces/tag';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})

export class TasksManagerService {
  taskId = 0;
  tasks: Array<Task>;

  tags: Array<Tag> = [
    { label: 'Work', color: 'purple' },
    { label: 'Important', color: 'orange' },
    { label: 'Family', color: 'green' },
    { label: 'Personal', color: 'blue' },
  ];

  sampleTasks: Array<Task> = [
    {
      id: 1,
      title: 'Add Tasks',
      tags: [this.tags[0], this.tags[1]],
      description: 'Add a task to the application!',
      due: Date.now(),
      isCompleted: false,
    },
  ];

  constructor(private route: ActivatedRoute) {
    this.tasks = this.getTasks();
  }

  getTasks() {
    const tasks = JSON.parse(window.localStorage.getItem('tasks'));

    if (!tasks) {
      window.localStorage.setItem('tasks', JSON.stringify(this.sampleTasks));
    }

    return tasks ? tasks : this.sampleTasks;
  }

  async createTask(newTask: Task) {
    this.tasks.push(newTask);
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  async updateTask(newTask: Task) {
    // Replace an existing task with the new task
    const oldTaskIndex = this.tasks.findIndex(task => task.id === newTask.id);
    this.tasks.splice(oldTaskIndex, 1, newTask);

    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  async deleteTask(task: Task) {
    // Remove a task matching that of the given task from the Task array
    const delIndex = this.tasks.findIndex(delTask => task.id === delTask.id);
    this.tasks.splice(delIndex, 1);

    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
