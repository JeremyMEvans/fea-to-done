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
    this.tasks.sort((a, b) => (
      a.due > b.due) ? 1 : (b.due > a.due) ? -1 : 0);
  }

  ngOnInit(): void {
  }

  shortenDescription(description: string) {
    const maxLength = 98
    if (description.length > maxLength) {
      var str = description.substring(0, maxLength - 1) + "...";
      return str;
    }

    return description;
  }
}
