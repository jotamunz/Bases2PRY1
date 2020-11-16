//MODULES
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

//MODELS
import { Form } from '../../models/Form';

@Injectable({
  providedIn: 'root',
})
export class GetUserFormsService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public getPendingForms(username: string): Observable<Form[]> {
    // Todo: user status for different get...
    return this.httpClient.get<Form[]>(
      `http://localhost:3000/forms/pending/${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  public getHistoryForms(username: string): Observable<Form[]> {
    // Todo: user status for different get...
    return this.httpClient.get<Form[]>(
      `http://localhost:3000/forms/history/${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }
}
