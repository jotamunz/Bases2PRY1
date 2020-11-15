//MODULES
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//SERVICES
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

//MODELS
import { User } from '../../../models/User';

@Component({
  selector: 'app-user-answered-forms-dashboard',
  templateUrl: './user-answered-forms-dashboard.component.html',
  styleUrls: ['./user-answered-forms-dashboard.component.css'],
})
export class UserAnsweredFormsDashboardComponent implements OnInit {
  user: User = null;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    console.log('Username');
    console.log(this.user.username);
    console.log('Username');
  }
}
