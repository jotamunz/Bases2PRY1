import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-admin-form-history-dashboard',
  templateUrl: './admin-form-history-dashboard.component.html',
  styleUrls: ['./admin-form-history-dashboard.component.css'],
})
export class AdminFormHistoryDashboardComponent implements OnInit {
  public historyDocuments: any = [];

  constructor(
    private authService: AuthService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.loadHistoryForms();
  }

  public loadHistoryForms(): void {
    let username: String = this.authService.getCurrentUser().username;
    // Get forms
    this.formService
      .getHistoryFormForUser(username)
      .subscribe((schemes: any[]) => {
        // Map to items in form
        schemes.forEach((scheme) => {
          // Assign form status text
          scheme.statusName = this.getStatusName(scheme.status);
          this.historyDocuments.push(scheme);
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
