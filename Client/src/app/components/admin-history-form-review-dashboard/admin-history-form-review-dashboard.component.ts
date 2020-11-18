import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-admin-history-form-review-dashboard',
  templateUrl: './admin-history-form-review-dashboard.component.html',
  styleUrls: ['./admin-history-form-review-dashboard.component.css'],
})
export class AdminHistoryFormReviewDashboardComponent implements OnInit {
  public historyDocuments: any = [];

  constructor(
    private authService: AuthService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.loadHistoryForms();
  }

  /**
   * Loads the history for the forms
   */
  public loadHistoryForms(): void {
    let username: String = this.authService.getCurrentUser().username;
    // Get form history by username
    this.formService
      .getHistoryFormReview(username)
      .subscribe((forms: any[]) => {
        // Map to items in form
        forms.forEach((form) => {
          // Assign form status text
          form.statusName = this.getStatusName(form.status);
          form.decisionName = this.getStatusName(form.decision);
          // Add to history array
          this.historyDocuments.push(form);
        });
      });
  }

  /**
   * Returns the name of the status
   * @param statusNumber The number of the status
   */
  private getStatusName(statusNumber: number): string {
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
