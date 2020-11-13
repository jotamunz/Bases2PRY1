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
  public pendingDocuments: any = [
    { name: 'Vacations Form', date: Date.now() },
    { name: 'School Form', date: Date.now() },
    { name: 'Recommendation Form', date: Date.now() },
    { name: 'Review Form', date: Date.now() },
  ];

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

    this.activatedRoute.params.subscribe((params) => {
      const { schemeName } = params;
      this.schemeService
        .getCompleteScheme('Vacaciones')
        .subscribe((scheme: Scheme) => {
          console.log(scheme.name);
          console.log(scheme.fields);
          this.temp = scheme;
        });
    });
    //console.log(this.temp.name);
    //console.log(this.temp.fields);
  }

  public loadSchemes(): void {
    this.schemeService.getAllSchemes().subscribe((schemes: any[]) => {
      console.log(schemes);
      // Map to items in form
      schemes.forEach((scheme) => {
        this.schemeItems.push(scheme);
      });
    });
  }
}
