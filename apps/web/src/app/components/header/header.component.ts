import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../../interfaces/task';

@Component({
  selector: 'nxlp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  appTitle = "To Done";
  pageTitle = "";
  isCompleted: boolean;
  @Input() task: Task;
  @Output() changeTask:EventEmitter<string> = new EventEmitter<string>();

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (this.task) {
        this.pageTitle = data.title ? data.title : this.task.title;
        this.isCompleted = this.task.isCompleted;
      }
    });
  }

  navEvent(command: string) {
    this.changeTask.emit(command);
  }
}
