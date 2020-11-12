import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AssignSchemeToUserComponent } from './components/assign-scheme-to-user/assign-scheme-to-user.component';

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
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/users/register',
    component: UserRegistrationComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/users/:userId/edit',
    component: EditUserComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/schemes/assign',
    component: AssignSchemeToUserComponent,
    canActivate: [AuthAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
