// Core Modules
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';

// AIDA Services
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: GetLoggedUserService, public router: Router, public route: ActivatedRoute) {}
  /**
   * Auth Guard Main Method
   */
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/auth')
      return false;
    }
      return true;  
  }
}
