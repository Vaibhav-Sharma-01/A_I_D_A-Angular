// Core Modules
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';

// AIDA Services
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  constructor(public auth: GetLoggedUserService, public router: Router, public route: ActivatedRoute) {}
  /**
   * LoginGuard  main Method
   */
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      return true
    }
    this.router.navigateByUrl('/dashboard');
    return false;
    
  }
}
