import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-admin-history-form-review-dashboard',
  templateUrl: './admin-history-form-review-dashboard.component.html',
  styleUrls: ['./admin-history-form-review-dashboard.component.css']
})
export class AdminHistoryFormReviewDashboardComponent implements OnInit {
  public historyDocuments: any = [];

  constructor(
    private authService : AuthService,
    private formService : FormService
  ) { }

  ngOnInit(): void {
    this.loadHistoryForms();
    console.log(this.historyDocuments)
  }

  public loadHistoryForms(): void {
    let username : String = this.authService.getCurrentUser().username;
    this.formService.getHistoryFormForUser(username).subscribe((schemes: any[]) => {
      // Map to items in form
      schemes.forEach((scheme) => {
        this.historyDocuments.push(scheme);
      });
    });
  }

}
