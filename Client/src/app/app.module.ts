// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// LOGIN MODULES
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

// LOCAL MODULES
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AssignSchemeToUserComponent } from './components/assign-scheme-to-user/assign-scheme-to-user.component';

// SERVICE MODULES
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthAdminGuard } from './guards/authadmin.guard';
import { AuthUserGuard } from './guards/authuser.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    UserRegistrationComponent,
    UsersComponent,
    EditUserComponent,
    AssignSchemeToUserComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    MatSliderModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthService, AuthUserGuard, AuthAdminGuard, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
