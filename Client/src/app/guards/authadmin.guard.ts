import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if authenticated and user is admin
    const { isAdmin } = this.authService.getCurrentUser();
    if (this.authService.getIsAuthenticated() && isAdmin) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
