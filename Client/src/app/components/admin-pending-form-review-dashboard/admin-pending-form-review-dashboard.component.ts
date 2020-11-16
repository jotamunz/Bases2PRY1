import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-admin-pending-form-review-dashboard',
  templateUrl: './admin-pending-form-review-dashboard.component.html',
  styleUrls: ['./admin-pending-form-review-dashboard.component.css']
})
export class AdminPendingFormReviewDashboardComponent implements OnInit {
  public pendingDocuments: any = [];


  constructor(
    private authService : AuthService,
    private formService : FormService
  ) { }

  ngOnInit(): void {
    this.loadPendingReviewForms();
    console.log(this.pendingDocuments)
  }

  public loadPendingReviewForms(): void {
    let username : String = this.authService.getCurrentUser().username;
    this.formService.getHistoryFormForUser(username).subscribe((schemes: any[]) => {
      // Map to items in form
      schemes.forEach((scheme) => {
        this.pendingDocuments.push(scheme);
      });
    });
  }

}
