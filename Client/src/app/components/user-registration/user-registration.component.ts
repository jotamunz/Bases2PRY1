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
    // TODO: Check for required fields
    // Register new user
    this.userService.registerNewUser(this.user).subscribe(
      (newUser: User) => {
        this.flashMesagesService.show(`${this.user.name} has been registered`, {
          cssClass: 'alert success-alert',
        });
        this.router.navigateByUrl('/admin/users');
      },
      (err) => {
        // TODO: Add repeated usernames validation
        console.log(err);
      }
    );
  }
}
