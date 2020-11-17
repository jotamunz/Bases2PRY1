import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form.service';

import { User } from '../../models/User';
import { RouteInfo } from '../../models/RouteInfo';

@Component({
  selector: 'app-route-info-dashboard',
  templateUrl: './route-info-dashboard.component.html',
  styleUrls: ['./route-info-dashboard.component.css'],
})
export class RouteInfoDashboardComponent implements OnInit {
  public users: User[];
  public routeProgress: any[];

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get route parameters
    this.activatedRoute.params.subscribe((params) => {
      const { username, schemeName, date } = params;
      // Get route information
      this.formService
        .getRouteInformation(username, schemeName, date)
        .subscribe((response: RouteInfo[]) => {
          // Check for decision
          for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < response[i].decisions.length; j++) {
              // Add approval date if no decision
              if (response[i].decisions[j].decision == 0) {
                response[i].decisions[j].approvalDate = 'Not defined...';
              } else {
                // Format date
                response[i].decisions[j].approvalDate = new Date(
                  response[i].decisions[j].approvalDate
                ).toLocaleString();
              }
            }
          }

          console.log(response);
        });
    });
  }
}
