import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
