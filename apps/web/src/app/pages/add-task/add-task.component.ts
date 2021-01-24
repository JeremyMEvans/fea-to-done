import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ViewChild } from '@angular/core';

import { TasksManagerService } from '../../services/tasks-manager.service';
import { Task } from '../../interfaces/task';
import { Tag } from '../../interfaces/tag';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'nxlp-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
  task: Task;
  @ViewChild('dueDate') dueDateInput: ElementRef;
  @ViewChild('name') nameInput: ElementRef;
  formattedDate: string;
  remainingTags: Array<Tag>;
  uploadedImage: any;

  constructor(
    private taskService: TasksManagerService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.task = this.getTask();
    this.formattedDate = this.formatDate();
    this.remainingTags = this.task.tags
      ? this.findTags()
      : this.taskService.tags;
  }

  findTags(): Array<Tag> {
    return this.taskService.tags.filter((tag) => {
      return !this.task.tags.find((ttag) => ttag.label === tag.label);
    });
  }

  changeTask(action: string) {
    switch (action) {
      case 'update':
        this.checkTask(this.task);
        break;
      case 'delete':
        this.task.id
          ? this.deleteTask(this.task)
          : this.router.navigate(['tasks']);
        break;
    }
  }

  formatDate() {
    const date = new Date(this.task.due);
    return (
      date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
    );
  }

  createTask() {
    const lastId = this.taskService.tasks
      .map((task) => task.id).sort().pop();
    const dateParts = this.formattedDate.split('/');
    this.task.due = +new Date(+dateParts[2], +dateParts[0] - 1, +dateParts[1]);
    const newTask: Task = {
      id: lastId + 1,
      img: this.uploadedImage ? this.uploadedImage : this.task.img,
      title: this.task.title,
      description: this.task.description,
      due: +new Date(this.task.due),
      tags: this.task.tags,
      isCompleted: false
    };
    this.taskService.createTask(newTask).then(() => {
      this.router.navigate(['tasks']);
    });
  }

  updateTask(task: Task) {
    task.img = this.uploadedImage ? this.uploadedImage : this.task.img;
    const dateParts = this.formattedDate.split('/');
    task.due = +new Date(+dateParts[2], +dateParts[0] - 1, +dateParts[1]);
    this.taskService.updateTask(task).then(() => {
      this.router.navigate(['tasks']);
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).then(() => {
      this.router.navigate(['tasks']);
    });
  }

  getTask() {
    let curTask: Task;
    this.route.params.subscribe (
      (params) =>
        (curTask = params.id
          ? this.taskService.tasks.find((task) => task.id === Number(params.id))
          : new Task())
    );
    return curTask;
  }

  checkTask = (task: Task) => {
    if (!task.title) {
      this.renderer.addClass(this.nameInput.nativeElement, 'check');
    } else {
      this.renderer.removeClass(this.nameInput.nativeElement, 'check');
      task.id ? this.updateTask(task) : this.createTask();
    }
  }

  storeThumb(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImage = reader.result;
    };
    reader.readAsDataURL(event[0]);
  }

  removeTag(tag: Tag) {
    this.task.tags = this.task.tags.filter((ttag) => ttag.label !== tag.label);
    this.remainingTags = this.findTags();
  }

  addTag(tag: Tag) {
    this.task.tags.push(tag);
    this.remainingTags = this.findTags();
  }

  /**
   * Retrieves the date from the form (when the date entry changes) and attempts to format it.
   * If no date has been entered, the formatted date defaults to today.
   */  
  onDueDateChange(e) {
    const dateCandidate = new Date(e.target.value);
    const changedDate = isNaN(dateCandidate.getDate()) ? new Date(Date.now()) : dateCandidate;
    this.formattedDate = changedDate.getMonth() + 1 + '/' + changedDate.getDate() + '/' + changedDate.getFullYear();
  }
}
