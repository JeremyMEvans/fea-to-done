import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddTaskRoutingModule } from './add-task-routing.module';
import { AddTaskComponent } from './add-task.component';

// MODULES

import { SharedModule } from '../../components/shared/shared.module'

@NgModule({
  declarations: [
    AddTaskComponent,
  ],
  imports: [
    CommonModule,
    AddTaskRoutingModule,
    SharedModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AddTaskModule { }
