import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

import { Scheme } from '../models/Scheme';

@Injectable({
  providedIn: 'root',
})
export class SchemeService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Get all schemes
   */
  public getAllSchemes(): Observable<Scheme[]> {
    return this.httpClient.get<Scheme[]>('http://localhost:3000/schemes/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

   /**
   * Get all schemes for a specified user
   */
  public getAllSchemesForUser(username : String): Observable<Scheme[]> {
    return this.httpClient.get<Scheme[]>(`http://localhost:3000/schemes/user/${username}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  /**
   * Get single scheme with fields
   */
  public getCompleteScheme(schemeName: string): Observable<Scheme> {
    return this.httpClient.get<Scheme>(
      `http://localhost:3000/schemes/${schemeName}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  /**
   * Add new scheme
   */
  public postScheme(scheme: Scheme): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/schemes/', scheme, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  /**
   * Delete a scheme
   */
  public deleteScheme(schemeName: string): Observable<any> {
    return this.httpClient.delete<any>(
      `http://localhost:3000/schemes/${schemeName}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  /**
   * Update a scheme
   */
  public updateScheme(scheme: any): Observable<any> {
    return this.httpClient.patch<any>(
      'http://localhost:3000/schemes/',
      scheme,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }
}
