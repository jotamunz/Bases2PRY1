import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-route-info-dashboard',
  templateUrl: './route-info-dashboard.component.html',
  styleUrls: ['./route-info-dashboard.component.css']
})
export class RouteInfoDashboardComponent implements OnInit {
  public users: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Get all users
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

}
