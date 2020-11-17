import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public pendingDocuments: any = [];

  constructor(
    private authService : AuthService,
    private formService : FormService
  ) {}

  ngOnInit(): void {
    this.loadPendingForms();
    console.log(this.pendingDocuments)
  }

  public loadPendingForms(): void {
    let username: String = this.authService.getCurrentUser().username;
    this.formService
      .getPendingFormForUser(username)
      .subscribe((schemes: any[]) => {
        console.log('Current schemes', schemes);

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
              )
                .toFixed(1)
                .toString() + '%';
          }

          // Get required rejecions
          scheme.requiredTotalRejections = this.calculateRequiredRejections(
            progress
          );
          // Check for required rejections = 0
          if (scheme.requiredTotalRejections == 0) {
            scheme.rejectionProgress = '0%';
          } else {
            scheme.rejectionProgress =
              this.calculateRejectionProgress(
                progress,
                scheme.requiredTotalRejections
              )
                .toFixed(1)
                .toString() + '%';
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
   * Calculates the total required rejections for a document
   * @param progress The progress of each approval route
   */
  private calculateRequiredRejections(progress: any[]): number {
    let totalRejections = 0;
    progress.forEach((progress) => {
      const { requiredRejections } = progress;
      totalRejections += requiredRejections;
    });
    return totalRejections;
  }

  /**
   * Calculates the current approvals for a document
   * @param progress The progress of each approval route
   * @param requiredApprovals The required approvals of a route
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

  /**
   * Calculates the rejection progress of a document
   * @param progress The progress of each approval route
   * @param requiredRejections The required rejections for a route
   */
  private calculateRejectionProgress(
    progress: any[],
    requiredRejections: number
  ): number {
    let currentTotalRejections = 0;
    progress.forEach((progress) => {
      const { currentRejections } = progress;
      currentTotalRejections += currentRejections;
    });

    return (currentTotalRejections / requiredRejections) * 100;
  }
}
