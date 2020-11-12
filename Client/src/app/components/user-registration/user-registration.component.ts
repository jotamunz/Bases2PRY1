import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service';

import { User } from '../../models/User';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  public user: User = {
    username: '',
    name: '',
    password: '',
    isAdmin: false,
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private flashMesagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    // Register new user
    console.log(this.user);
    this.userService.registerNewUser(this.user).subscribe(
      (newUser: User) => {
        this.flashMesagesService.show(`${this.user.name} has been registered`, {
          cssClass: 'alert success-alert',
        });
        this.router.navigateByUrl('/admin/dashboard');
      },
      (err) => {
        // TODO: User validation
        // Show error messages
        this.flashMesagesService.show('Please fill in the form correctly', {
          cssClass: 'alert danger-alert',
        });
      }
    );
  }
}
