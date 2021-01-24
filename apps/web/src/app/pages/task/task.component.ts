import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../interfaces/task';
import { TasksManagerService } from '../../services/tasks-manager.service';

@Component({
  selector: 'nxlp-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Output() titleChange = new EventEmitter<string>();

  task: Task;

  constructor(
    private router: Router,
    private taskService: TasksManagerService
  ) {}

  ngOnInit(): void {
    this.task = this.getTask();
    this.emitTitle();
  }

  getTask = () => {
    const taskId = Number(window.location.pathname.split('/').pop());
    console.log("Task id: " + taskId);
    return this.taskService.tasks.find((task) => taskId === task.id);
  };

  emitTitle() {
    this.titleChange.emit(this.task.title);
  }

  completeTask() {
    this.router.navigate(['/tasks']);
  }
}
