import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public pendingDocuments: any = [];
  public username: String = this.authService.getCurrentUser().username;

  constructor(
    private authService : AuthService,
    private formService : FormService,
    private flashMessagesService : FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.loadPendingForms();
  }

  public loadPendingForms(): void {
    this.formService
      .getPendingFormForUser(this.username)
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
            let maxRoute = this.getMaxRejectionsRoute(progress)
            scheme.rejectionProgress = this.calculateRejectionProgress(maxRoute)
                .toFixed(1)
                .toString() + '%';
          }

          // Add to pending documents
          this.pendingDocuments.push(scheme);
        });

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
  private calculateRejectionProgress( progress: any[]): number {
    let currentTotalRejections = 0;
    progress.forEach((progress) => {
      const { currentRejections } = progress;
      currentTotalRejections += currentRejections;
    });
    return (currentTotalRejections / progress[0].requiredRejections) * 100;
  }

  public onDeleteClick(schemeName: String, date : String) {
    this.formService.deleteForm(this.username,schemeName,date).subscribe(
      (response) => {
        this.flashMessagesService.show(
          `The form has been deleted succesfully`,
          {
            cssClass: 'alert success-alert',
          }
        );
        this.removeForm(schemeName,date);
      },
      (err) => {
        this.flashMessagesService.show(err.error.message, {
          cssClass: 'alert danger-alert',
        });
      }
    );
    
  }

  public removeForm(schemeName: String, date : String): void {
    let formTemp = [];
    this.pendingDocuments.forEach((form) => {
      if ((form.schemeName != schemeName) || (form.creationDate != date)) {
        formTemp.push(form);
      }
    });
    this.pendingDocuments = formTemp;
  }

  public getMaxRejectionsRoute(progress : any[]): any[] {
    let maxRoute = progress[0];
    progress.forEach(element => {
      if (maxRoute.currentRejections <= element.currentRejections){
        maxRoute = element;
      }
    });
    return [maxRoute]
  }
  
}
