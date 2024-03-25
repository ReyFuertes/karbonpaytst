import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FocusTrapModule } from 'primeng/focustrap';
import { DialogModule } from 'primeng/dialog';

import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { DashboardComponentComponent } from './dashboard-container.component';
import { DasboardComponent } from './components/dashboard/dashboard.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponentComponent,
    children: [
      {
        path: '',
        component: DasboardComponent
      },
      {
        path: 'company-profile',
        component: CompanyProfileComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponentComponent,
    CompanyProfileComponent,
    DasboardComponent,
    CompanyProfileComponent
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
    RouterModule.forChild(routes)
  ],
  exports: [],
  providers: [],
})
export class DashboardModule { }