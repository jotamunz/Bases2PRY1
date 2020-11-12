import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Registers a new user
   * @param user User data to register
   */
  public registerNewUser(user: User): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:3000/users/register',
      user,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }
}
