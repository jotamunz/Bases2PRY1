import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';

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
    path: 'admin/users/register',
    component: UserRegistrationComponent,
    canActivate: [AuthAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
