import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';

import { Scheme } from '../../models/Scheme';
import { RoutePreview } from '../../models/Routes-Models/RoutePreview';
import { RouteDetailed } from 'src/app/models/Routes-Models/RouteDetailed';

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
  public getAllRoutesPreview(): Observable<RouteDetailed[]> {
    return this.httpClient.get<RouteDetailed[]>(
      'http://localhost:3000/approvalRoutes/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  /**
   * Add a new Route
   */
  public postRoute(route: any): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:3000/approvalRoutes/',
      route,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  /**
   * Delete a Route
   */
  public deleteRoute(routeName: String): Observable<any> {
    return this.httpClient.delete<any>(
      `http://localhost:3000/approvalRoutes/${routeName}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  /**
   * Toggle a Route
   */
  public toggleRoute(routeName: String): Observable<any> {
    return this.httpClient.patch<any>(
      `http://localhost:3000/approvalRoutes/toggle/${routeName}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  /**
   * Get a Route
   */
  public getSpesRoute(routeName: String): Observable<RoutePreview> {
    return this.httpClient.get<RoutePreview>(
      `http://localhost:3000/approvalRoutes/${routeName}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }
}
