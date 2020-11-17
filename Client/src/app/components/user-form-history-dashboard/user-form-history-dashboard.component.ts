import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-user-form-history-dashboard',
  templateUrl: './user-form-history-dashboard.component.html',
  styleUrls: ['./user-form-history-dashboard.component.css']
})
export class UserFormHistoryDashboardComponent implements OnInit {
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
