import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FocusTrapModule } from 'primeng/focustrap';
import { DialogModule } from 'primeng/dialog';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';

import { EmployeeMenuOptionComponent } from './components/employee-menu-option/employee-menu-option.component';
import { EmployeeContainerComponent } from './employee-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { MessageService } from 'primeng/api';
import { EmployeeOverviewComponent } from './components/employee-overview/employee-overview.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeContainerComponent,
    children: [
      {
        path: 'menu',
        component: EmployeeMenuOptionComponent
      },
      {
        path: 'add',
        component: EmployeeAddComponent
      },
      {
        path: 'overview',
        component: EmployeeOverviewComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    EmployeeContainerComponent,
    EmployeeMenuOptionComponent,
    EmployeeAddComponent,
    EmployeeOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    FocusTrapModule,
    DialogModule,
    CalendarModule,
    ToastModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  providers: [MessageService],
})
export class EmployeeModule { }