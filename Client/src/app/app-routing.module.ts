//MODULES
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//COMPONENTS
import { AddSchemeComponent } from './components/add-scheme/add-scheme.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AssignSchemeToUserComponent } from './components/assign-scheme-to-user/assign-scheme-to-user.component';
import { EditSchemeComponent } from './components/edit-scheme/edit-scheme.component';
import { AdminRequestDashboardComponent } from './components/admin-request-dashboard/admin-request-dashboard.component';
import { AdminLayoutDynamicFormComponent } from './components/Request-Forms-Components-admin/admin-layout-dynamic-form/admin-layout-dynamic-form.component';

import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LayoutDynamicFormComponent } from './components/Request-Forms-Components/layout-dynamic-form/layout-dynamic-form.component';
import { ListAllSchemesComponent } from './components/list-all-schemes/list-all-schemes.component';
import { LoginComponent } from './components/login/login.component';
import { UserAnsweredFormsDashboardComponent } from './components/View-Forms-Components/user-answered-forms-dashboard/user-answered-forms-dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserRequestDashboardComponent } from './components/Request-Forms-Components/user-request-dashboard/user-request-dashboard.component';
import { UserUnansweredFormsDashboardComponent } from './components/View-Forms-Components/user-unanswered-forms-dashboard/user-unanswered-forms-dashboard.component';

//SERVICES
import { AuthUserGuard } from './guards/authuser.guard';
import { AuthAdminGuard } from './guards/authadmin.guard';
import { fromEventPattern } from 'rxjs';

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
    canActivate: [AuthUserGuard],
  },
  {
    path: 'admin/form/dashboard/:schemeName/fill',
    component: AdminLayoutDynamicFormComponent,
    canActivate: [AuthAdminGuard],
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
    path: 'user/viewForms/dashboard/answered',
    component: UserAnsweredFormsDashboardComponent,
    // Todo: authorization
  },
  {
    path: 'user/viewForms/dashboard/pending',
    component: UserUnansweredFormsDashboardComponent,
    // Todo: authorization
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
