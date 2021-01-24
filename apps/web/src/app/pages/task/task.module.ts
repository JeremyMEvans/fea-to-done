import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';

// MODULES

import { SharedModule } from '../../components/shared/shared.module'

@NgModule({
  declarations: [
    TaskComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class TaskModule { }
