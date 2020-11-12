import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs'
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean;
  private currentUser: User;
  private token: string;
  private jwtHelper: JwtHelperService;

  constructor(private httpClient : HttpClient) {
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
   * Loads authentication token and user information
   */
  public loadAuthenticationToken(): void {
    // Check for token
    const token: string = localStorage.getItem('authToken');
    if (token) {
      // Check if token is expired
      if (this.jwtHelper.isTokenExpired(token)) {
        localStorage.removeItem('authToken');
        return;
      }
      // Authenticate user and load user information
      this.setAuthenticationToken(token);
    }
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

  public authenticateUser(userInfo:User): Observable<any>
  {
    return this.httpClient.post("http://localhost:3000/users/login",userInfo,{headers:{"Content-Type":"application/json"}})
  }
}
