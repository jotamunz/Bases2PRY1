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
    let username : String = this.authService.getCurrentUser().username;
    this.formService.getPendingFormForUser(username).subscribe((schemes: any[]) => {
      // Map to items in form
      schemes.forEach((scheme) => {
        this.pendingDocuments.push(scheme);
      });
    });
  }
}
