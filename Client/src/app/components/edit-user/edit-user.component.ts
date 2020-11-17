import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service';

import { User } from '../../models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  public user: User = {
    username: '',
    name: '',
    password: '',
    isAdmin: false,
  };

  constructor(
    private userService: UserService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const { username } = params;
      this.userService.getUserByUsername(username).subscribe((user: User) => {
        this.user = user;
      });
    });
  }

  onSubmit(): void {
    this.userService
      .editUser({
        oldUsername: this.user.username,
        newUsername: this.user.username,
        name: this.user.name,
        password: this.user.password,
        isAdmin: this.user.isAdmin,
      })
      .subscribe(
        (response) => {
          this.flashMessagesService.show(
            `${this.user.username} has been modified succesfully`,
            {
              cssClass: 'alert success-alert',
            }
          );
          this.router.navigateByUrl('/admin/users');
        },

        (err) => {
          console.log(err.error.message);
          this.flashMessagesService.show(err.error.message.message, {
            cssClass: 'alert danger-alert',
          });
        }
      );
  }
}
