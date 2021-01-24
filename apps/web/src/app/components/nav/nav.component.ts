import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common'
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'nxlp-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  baseUrl: string;
  taskId: number;
  @Input() position: string;
  @Input() isCompleted: boolean;
  @Output() navEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private location: Location, private router: Router) 
  { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.baseUrl = window.location.pathname.split('/')[1];
        this.taskId = (Number)(window.location.pathname.split('/').pop());
      }
    });
  }

  ngOnInit(): void {
    this.baseUrl = window.location.pathname.split('/')[1];
    this.taskId = (Number)(window.location.pathname.split('/').pop());
  }

  // Events (Angular)

  onUpdateTask() {
    this.navEvent.emit('update');
  }

  onDeleteTask() {
    this.navEvent.emit('delete');
  }

  onCompleteTask() {
    this.navEvent.emit('complete');
  }

  // Routing (via nxlp-button Component)

  goToPrevPage() {
    this.location.back();
  }
  
  addTask() {
    this.router.navigateByUrl('/add');
  }

  editTask() {
    this.router.navigate(['edit', this.taskId]); 
  }

  goToTasks() {
    this.router.navigateByUrl('/tasks');
  }
}
