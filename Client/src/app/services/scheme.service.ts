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
}
