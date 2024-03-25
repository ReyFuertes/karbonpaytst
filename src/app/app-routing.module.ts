import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CompanySetupComponent } from './shared/components/company-setup/company-setup.component';

const routes: Routes = [
  { path: '', redirectTo: 'company-setup', pathMatch: 'full' },
  {
    path: 'company-setup',
    component: CompanySetupComponent
  },
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: 'employee',
        loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
