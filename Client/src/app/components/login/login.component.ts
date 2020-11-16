import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User;
  public username: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    if (this.authService.getIsAuthenticated()) {
      if (this.authService.getCurrentUser().isAdmin) {
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        this.router.navigateByUrl('/user/dashboard');
      }
    }
  }

  // @param User information
  // @returns Action event
  // On submit sends the information on the Login form
  public onSubmit(): void {
    this.user = {
      username: this.username,
      password: this.password,
    };

    this.authService.authenticateUser(this.user).subscribe(
      (res) => {
        console.log(1);
        this.authService.setAuthenticationToken(res.token);

        if (this.authService.getCurrentUser().isAdmin) {
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.router.navigateByUrl('/user/dashboard');
        }
        this.flashMessagesService.show('You´ve logged in succesfully!', {
          cssClass: 'alert success-alert',
        });
      },
      (error) => {
        this.flashMessagesService.show(error.error.message, {
          cssClass: 'alert danger-alert',
        });
      }
    );
  }
}
