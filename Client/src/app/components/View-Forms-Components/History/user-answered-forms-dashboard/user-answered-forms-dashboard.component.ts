//MODULES
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//SERVICES
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';
import { GetUserFormsService } from '../../../../services/Form-View-Services/get-user-forms.service';

//MODELS
import { User } from '../../../../models/User';
import { FormView } from '../../../../models/FormsView';

@Component({
  selector: 'app-user-answered-forms-dashboard',
  templateUrl: './user-answered-forms-dashboard.component.html',
  styleUrls: ['./user-answered-forms-dashboard.component.css'],
})
export class UserAnsweredFormsDashboardComponent implements OnInit {
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
    console.log('Username');
    console.log(this.user.username);
    console.log('Username');
    this.loadForms(this.user.username);
  }

  public loadForms(username: string): void {
    this.getUserFormsService
      .getHistoryForms(username)
      .subscribe((forms: any[]) => {
        forms.forEach((form) => {
          this.formItems.push(form);
          console.log(form.creationDate);
        });
      });
  }
}
