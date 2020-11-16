import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  public pendingDocuments: any = [];

  constructor(
    private authService: AuthService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.loadPendingForms();
  }

  public loadPendingForms(): void {
    let username: String = this.authService.getCurrentUser().username;
    this.formService
      .getPendingFormForUser(username)
      .subscribe((schemes: any[]) => {
        // Map to items in form
        schemes.forEach((scheme) => {
          const { progress } = scheme;
          // Get required approvals
          scheme.requiredTotalApprovals = this.calculateRequiredApprovals(
            progress
          );
          // Check for required approvals = 0
          if (scheme.requiredTotalApprovals == 0) {
            scheme.approvalProgress = '100%';
          } else {
            // Calculate approval progress
            scheme.approvalProgress =
              this.calculateApprovalProgress(
                progress,
                scheme.requiredTotalApprovals
              ).toString() + '%';
          }
          // Add to pending documents
          this.pendingDocuments.push(scheme);
        });

        console.log(this.pendingDocuments);
      });
  }

  /**
   * Calculates the total required approvals for a document
   * @param progress The progress of each approval route
   */
  private calculateRequiredApprovals(progress: any[]): number {
    let totalApprovals = 0;
    progress.forEach((progress) => {
      const { requiredApprovals } = progress;
      totalApprovals += requiredApprovals;
    });
    return totalApprovals;
  }

  /**
   * Calculates the current approvals for a document
   * @param progress The progress of each approval route
   */
  private calculateApprovalProgress(
    progress: any[],
    requiredApprovals: number
  ): number {
    let currentTotalApprovals = 0;
    progress.forEach((progress) => {
      const { currentApprovals } = progress;
      currentTotalApprovals += currentApprovals;
    });

    return (currentTotalApprovals / requiredApprovals) * 100;
  }
}
