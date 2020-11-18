import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SchemeService } from '../../services/scheme.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

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
  public authors: User[] = [];
  public approvers: User[] = [];
  public newRoute: ApprovalRoute = {
    name: '',
    requiredApprovals: 0,
    requiredRejections: 0,
    authors: [],
    approvers: [],
  };

  constructor(
    private flashMessagesService: FlashMessagesService,
    private schemeService: SchemeService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFormInformation();
  }

  /**
   * Loads all the schemes
   */
  public loadFormInformation(): void {
    // Get all schemes
    this.schemeService.getAllSchemes().subscribe((schemes: Scheme[]) => {
      this.schemes = schemes;
    });
    // Get all authors
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.authors = users.filter(
        (user) => user.username !== this.authService.getCurrentUser().username
      );
    });
    // Get all admins
    this.userService.getAdmins().subscribe((admins: User[]) => {
      this.approvers = admins;
    });
  }
}
