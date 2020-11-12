//MODULES
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//COMPONENTS
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LayoutDynamicFormComponent } from './components/Request-Forms-Components/layout-dynamic-form/layout-dynamic-form.component';
import { UserRequestDashboardComponent } from './components/Request-Forms-Components/user-request-dashboard/user-request-dashboard.component';

//SERVICES
import { AuthUserGuard } from './guards/authuser.guard';
import { AuthAdminGuard } from './guards/authadmin.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'user/form/fill',
    component: LayoutDynamicFormComponent,
  },
  {
    path: 'user/form/dashboard',
    component: UserRequestDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
