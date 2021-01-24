import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TasksManagerService } from '../../services/tasks-manager.service';

@Component({
  selector: 'nxlp-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {
  public tasks: Array<Task>;

  constructor(taskManagerService: TasksManagerService) {
    this.tasks = taskManagerService.tasks.filter(task => task.isCompleted !== true);
  }

  ngOnInit(): void {
    console.log("Number of tasks: " + this.tasks.length);
    this.tasks.forEach((value) => {
      console.log("Task id: " + value.id);
    })
  }
}
