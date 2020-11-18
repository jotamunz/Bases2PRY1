import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';

import { Scheme } from '../../models/Scheme';
import { RoutePreview } from '../../models/Routes-Models/RoutePreview';

@Injectable({
  providedIn: 'root',
})
export class RoutePreviewService {
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
   * Get all routes previews
   */
  public getAllRoutesPreview(): Observable<RoutePreview[]> {
    return this.httpClient.get<Scheme[]>(
      'http://localhost:3000/approvalRoutes/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }
}
