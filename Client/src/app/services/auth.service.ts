import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean;
  private currentUser: User;
  private token: string;
  private jwtHelper: JwtHelperService;

  constructor() {
    this.isAuthenticated = false;
    this.token = null;
    this.currentUser = {
      _id: '',
      username: '',
      name: '',
      password: '',
    };
    this.jwtHelper = new JwtHelperService();
  }

  /**
   * Sets the authentication token and user information
   * @param token JWT token for authentication
   */
  public setAuthenticationToken(token: string): void {
    // Save token in app & localStorage
    this.token = token;
    localStorage.setItem('authToken', token);
    // Get user data
    this.currentUser = this.jwtHelper.decodeToken(token).user;
    this.isAuthenticated = true;
  }

  /**
   * Removes user and token from localStorage
   */
  public logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.currentUser = {
      _id: '',
      username: '',
      name: '',
      password: '',
    };
    // Remove token from localStorage
    localStorage.removeItem('authToken');
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
