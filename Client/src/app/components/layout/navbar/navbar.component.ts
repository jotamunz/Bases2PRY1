import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

import { User } from '../../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  /**
   * Returns the user to the login page
   */
  public onLogoutClick(): void {
    this.authService.logout();
    this.flashMessagesService.show("You've been logged out", {
      cssClass: 'alert success-alert',
    });
    this.router.navigateByUrl('/');
  }

  public isUserAuthenticated(): boolean {
    return this.authService.getIsAuthenticated();
  }

  public isAdmin(): boolean {
    return this.authService.getCurrentUser().isAdmin;
  }

  public getCurrentUser(): User {
    return this.authService.getCurrentUser();
  }
}
