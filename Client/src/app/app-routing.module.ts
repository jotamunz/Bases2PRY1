//MODULES
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//COMPONENTS
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LayoutDynamicFormComponent } from './components/Request-Forms-Components/layout-dynamic-form/layout-dynamic-form.component';
import { UserRequestDashboardComponent } from './components/Request-Forms-Components/user-request-dashboard/user-request-dashboard.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AssignSchemeToUserComponent } from './components/assign-scheme-to-user/assign-scheme-to-user.component';
import { ListAllSchemesComponent } from './components/list-all-schemes/list-all-schemes.component';
import { EditSchemeComponent } from './components/edit-scheme/edit-scheme.component';
import { AddSchemeComponent } from './components/add-scheme/add-scheme.component';
import { AdminRequestDashboardComponent } from './components/admin-request-dashboard/admin-request-dashboard.component';

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
    path: 'user/form/dashboard/:schemeName/fill',
    component: LayoutDynamicFormComponent,
  },
  {
    path: 'user/form/dashboard',
    component: UserRequestDashboardComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'admin/form/dashboard',
    component: AdminRequestDashboardComponent,
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
    path: 'admin/users/:username/edit',
    component: EditUserComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/users/:username/assignSchemes',
    component: AssignSchemeToUserComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/schemes',
    component: ListAllSchemesComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/schemes/add',
    component: AddSchemeComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/schemes/:schemeName/edit',
    component: EditSchemeComponent,
    canActivate: [AuthAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
