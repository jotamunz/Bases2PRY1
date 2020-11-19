import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../../services/form.service';

import { RouteInfo } from '../../../models/RouteInfo';

@Component({
  selector: 'app-route-info-dashboard',
  templateUrl: './route-info-dashboard.component.html',
  styleUrls: ['./route-info-dashboard.component.css'],
})
export class RouteInfoDashboardComponent implements OnInit {
  public routeProgress: RouteInfo[] = [];

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
          console.log(response);
          // Check for decision
          for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < response[i].decisions.length; j++) {
              // Add decision name
              response[i].decisions[j].decisionName = this.getDecisionName(
                response[i].decisions[j].decision
              );
              // Format names
              response[i].decisions[j].approverName =
                response[i].decisions[j].approverName;
              // Add approval date if no decision
              if (response[i].decisions[j].decision == 0) {
                response[i].decisions[j].approvalDate = 'Not defined...';
              } else {
                // Format date
                response[i].decisions[j].approvalDate = new Date(
                  response[i].decisions[j].approvalDate
                )
                  .toLocaleString()
                  .slice(0, 10);
              }
            }
          }
          this.routeProgress = response;
        });
    });
  }

  /**
   * Returns the name of the status
   * @param statusNumber The number of the status
   */
  private getDecisionName(statusNumber: number): string {
    switch (statusNumber) {
      case 0:
        return 'Pending';
      case 1:
        return 'Approved';
      default:
        return 'Rejected';
    }
  }
}
