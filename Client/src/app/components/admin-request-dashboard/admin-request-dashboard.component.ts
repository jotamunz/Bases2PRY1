import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { SchemeService } from '../../services/scheme.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Scheme } from '../../models/Scheme';

@Component({
  selector: 'app-admin-request-dashboard',
  templateUrl: './admin-request-dashboard.component.html',
  styleUrls: ['./admin-request-dashboard.component.css'],
})
export class AdminRequestDashboardComponent implements OnInit {
  public schemeItems: any = [];
  public temp: Scheme = null;

  constructor(
    private userService: UserService,
    private schemeService: SchemeService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadSchemes();
  }

  public onSubmit(): void {}

  public loadSchemes(): void {
    // Get schemes of a user
    let username: String = this.authService.getCurrentUser().username;
    this.schemeService
      .getAllSchemesForUser(username)
      .subscribe((schemes: any[]) => {
        // Map to items in form
        schemes.forEach((scheme) => {
          this.schemeItems.push(scheme);
        });
      });
  }
}
