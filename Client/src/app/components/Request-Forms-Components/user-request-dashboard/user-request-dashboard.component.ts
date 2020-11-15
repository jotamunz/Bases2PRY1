import { Component, OnInit } from '@angular/core';

//SERVICES
import { UserService } from '../../../services/user.service';
import { SchemeService } from '../../../services/scheme.service';
import { Router, ActivatedRoute } from '@angular/router';

//MODELS
import { User } from '../../../models/User';
import { Scheme } from '../../../models/Scheme';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-request-dashboard',
  templateUrl: './user-request-dashboard.component.html',
  styleUrls: ['./user-request-dashboard.component.css'],
})
export class UserRequestDashboardComponent implements OnInit {
  public schemeItems: any = [];
  public temp: Scheme = null;

  constructor(
    private userService: UserService,
    private schemeService: SchemeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadSchemes();
    // this.loadSchemes();
  }

  public onSubmit(): void {
    // TODO: Go to form display
  }

  public loadSchemes(): void {
    this.schemeService.getAllSchemes().subscribe((schemes: any[]) => {
      // Map to items in form
      schemes.forEach((scheme) => {
        this.schemeItems.push(scheme);
      });
    });
  }
}
