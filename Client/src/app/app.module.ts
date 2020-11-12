// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//FORM MODULES
import { MatSelectModule } from '@angular/material/select';

// LOGIN MODULES
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

// LOCAL MODULES
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { DynamicFormQuestionComponent } from './components/Request-Forms-Components/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './components/Request-Forms-Components/dynamic-form/dynamic-form.component';

// SERVICE MODULES
import { AuthService } from './services/auth.service';
import { AuthAdminGuard } from './guards/authadmin.guard';
import { AuthUserGuard } from './guards/authuser.guard';
import { LayoutDynamicFormComponent } from './components/Request-Forms-Components/layout-dynamic-form/layout-dynamic-form.component';
import { AddFormSchemeComponent } from './components/add-form-scheme/add-form-scheme.component';
import { UserRequestDashboardComponent } from './components/Request-Forms-Components/user-request-dashboard/user-request-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    LayoutDynamicFormComponent,
    AddFormSchemeComponent,
    UserRequestDashboardComponent,
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
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, AuthUserGuard, AuthAdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
