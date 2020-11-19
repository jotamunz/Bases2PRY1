import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SchemeService } from '../../services/scheme.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { RoutePreviewService } from '../../services/Route-Services/route-preview.service';

import { Scheme } from '../../models/Scheme';
import { User } from '../../models/User';
import { ApprovalRoute } from '../../models/ApprovalRoute';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css'],
})
export class AddRouteComponent implements OnInit {
  public schemes: Scheme[] = [];
  public authorItems: any[];
  public approverItems: any[];
  public newRoute: ApprovalRoute = {
    name: '',
    schemeName: '',
    requiredApprovals: 0,
    requiredRejections: 0,
    authors: [],
    approvers: [],
  };

  constructor(
    private flashMessagesService: FlashMessagesService,
    private schemeService: SchemeService,
    private userService: UserService,
    private authService: AuthService,
    private routeService: RoutePreviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get all schemes
    this.schemeService.getAllSchemes().subscribe((schemes: Scheme[]) => {
      this.schemes = schemes;
    });
    // Get all authors
    this.userService.getAllUsers().subscribe((users: User[]) => {
      let userItems = users.filter(
        (user) => user.username !== this.authService.getCurrentUser().username
      );
      userItems = userItems.map((item) => ({
        username: item.username,
        checked: false,
      }));
      this.authorItems = userItems;
    });
    // Get all admins
    this.userService.getAdmins().subscribe((admins: User[]) => {
      let approverItems = admins.map((user) => ({
        username: user.username,
        checked: false,
      }));
      this.approverItems = approverItems;
    });
  }

  public onAuthorSelected(username: string): void {
    this.approverItems.forEach((approver) => {
      if (approver.username === username) {
        approver.checked = false;
      }
    });
  }

  public onApproverSelected(username: string): void {
    this.authorItems.forEach((author) => {
      if (author.username === username) {
        author.checked = false;
      }
    });
  }

  public onSchemeSelected(schemeName: string): void {
    this.newRoute.schemeName = schemeName;
  }

  /**
   * Submits the form
   */
  public onSubmit(): void {
    // Field validations
    if (
      this.newRoute.name == '' ||
      this.newRoute.requiredApprovals == null ||
      this.newRoute.requiredRejections == null ||
      this.newRoute.schemeName == ''
    ) {
      this.flashMessagesService.show('Please fill in the form correctly', {
        cssClass: 'alert danger-alert',
      });
      return;
    }
    // Get authors
    this.authorItems.forEach((author) => {
      if (author.checked) {
        this.newRoute.authors.push(author);
      }
    });
    // Get approvers
    this.approverItems.forEach((approver) => {
      if (approver.checked) {
        this.newRoute.approvers.push(approver);
      }
    });
    // Check for approvers and authors
    if (
      this.newRoute.authors.length == 0 ||
      this.newRoute.approvers.length == 0
    ) {
      this.flashMessagesService.show(
        'Please enter approvals or authors to the route',
        {
          cssClass: 'alert danger-alert',
        }
      );
      return;
    }
    // Check for consistency in rejections and approvals
    if (
      this.newRoute.approvers.length < this.newRoute.requiredApprovals ||
      this.newRoute.approvers.length < this.newRoute.requiredRejections
    ) {
      this.flashMessagesService.show(
        'Please validate your entries for rejections and approvals',
        {
          cssClass: 'alert danger-alert',
        }
      );
      return;
    }
    // Add route
    this.routeService.postRoute(this.newRoute).subscribe(
      (response: any) => {
        // Show message and redirect
        this.flashMessagesService.show('Approval route created', {
          cssClass: 'alert success-alert',
        });
        this.router.navigateByUrl('/admin/routePreview');
      },
      (err) => {
        this.flashMessagesService.show(err.error.message, {
          cssClass: 'alert danger-alert',
        });
      }
    );
  }
}
