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
    // TODO: Update user (PUT)
    // TODO: Form validations
  }
}
