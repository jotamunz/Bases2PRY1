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
    private FlashMessagesService: FlashMessagesService
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
        this.authService.setAuthenticationToken(res.token);

        if (this.authService.getCurrentUser().isAdmin) {
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.router.navigateByUrl('/user/dashboard');
        }
        this.FlashMessagesService.show('You´ve logged in succesfully!', {
          cssClass: 'alert success-alert',
        });
      },
      (error) => {
        this.FlashMessagesService.show(error.error.message, {
          cssClass: 'alert danger-alert',
        });
      }
    );

    // Set Token setAuthenticationToken(token: string)

    // TODO: Incluir auth service aqui
    console.log(this.user.username);
    console.log(this.user.password);
  }
}
