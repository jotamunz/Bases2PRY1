import { Component, OnInit } from '@angular/core';

//SERVICES
import { UserService } from '../../services/user.service';
import { SchemeService } from '../../services/scheme.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';


//MODELS
import { User } from '../../models/User';
import { Scheme } from '../../models/Scheme';
import { RouterLink } from '@angular/router';

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
    private authService : AuthService

  ) {}

  ngOnInit(): void {
    this.loadSchemes();
  }

  public onSubmit(): void {
    // TODO: Go to form display
  }

  public loadSchemes(): void {
    let username : String = this.authService.getCurrentUser().username;
    this.schemeService.getAllSchemes().subscribe((schemes: any[]) => {
      // Map to items in form
      schemes.forEach((scheme) => {
        this.schemeItems.push(scheme);
      });
    });
  }
}