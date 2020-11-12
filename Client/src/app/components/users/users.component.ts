import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public users: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Get all users
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
