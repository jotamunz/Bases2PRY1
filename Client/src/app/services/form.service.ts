import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

import { Form } from '../models/Form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Registers a new Form
   * @param user User data to register
   */
  public registerNewForm(form: Form): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:3000/forms/',
      form,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }


  /**
   * Registers a new Form
   * @param user User data to register
   */
  public getFormBySchemeUser(userUsername: string,schemeName: string,date: string): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:3000/forms/${userUsername}/${schemeName}/${date}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

}
