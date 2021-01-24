import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: 'tasks', 
    loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) 
  },
  { 
    path: 'task/:id', // Header title is given via the EventEmitter.
    loadChildren: () => import('./pages/task/task.module').then(m => m.TaskModule)
  },
  { 
    path: 'add',
    data: { title: "Add Task" },
    loadChildren: () => import('./pages/add-task/add-task.module').then(m => m.AddTaskModule)
  },
  {
    path: 'edit/:id',
    data: { title: "Add Task" },
    loadChildren: () => import('./pages/add-task/add-task.module').then(m => m.AddTaskModule)
  },
  {
    path: '', redirectTo: 'tasks', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
