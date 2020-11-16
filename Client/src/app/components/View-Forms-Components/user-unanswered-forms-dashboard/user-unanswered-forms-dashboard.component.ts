//MODULES
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//SERVICES
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { GetUserFormsService } from '../../../services/Form-View-Services/get-user-forms.service';

//MODELS
import { User } from '../../../models/User';
import { FormView } from '../../../models/FormsView';

@Component({
  selector: 'app-user-unanswered-forms-dashboard',
  templateUrl: './user-unanswered-forms-dashboard.component.html',
  styleUrls: ['./user-unanswered-forms-dashboard.component.css'],
})
export class UserUnansweredFormsDashboardComponent implements OnInit {
  user: User = null;
  public formItems: FormView[] = [];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private getUserFormsService: GetUserFormsService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loadForms(this.user.username);
  }

  public loadForms(username: string): void {
    this.getUserFormsService
      .getPendingForms(username)
      .subscribe((forms: any[]) => {
        forms.forEach((form) => {
          this.formItems.push(form);
          console.log(form.creationDate);
        });
      });
  }
}
