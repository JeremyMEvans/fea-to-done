import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';

// MODULES

import { SharedModule } from '../../components/shared/shared.module'

@NgModule({
  declarations: [
    TasksComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class TasksModule { }
