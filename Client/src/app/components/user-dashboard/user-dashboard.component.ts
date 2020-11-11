import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public pendingDocuments: any = [
    { name: 'Vacations', date: Date.now() },
    { name: 'New position', date: Date.now() },
    { name: 'Recommendation', date: Date.now() },
    { name: 'Infrastrcuture review', date: Date.now() },
  ];

  constructor() {}

  ngOnInit(): void {}
}
