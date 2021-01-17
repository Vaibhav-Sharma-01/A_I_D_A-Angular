import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

// 3rd Party Modules
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetLoggedUserService {

  constructor() { }

  /**
   * Get logged in user data
   */
  getLoginUserData(): Observable<any> {
    const user = localStorage.getItem('user');
    if (user) {
      return of(JSON.parse(user));
    }
    return of({});
  }

  /**
   * Is authenticated
   */
  isAuthenticated() {
    const user = localStorage.getItem('user');
    
    if (user) {
      const userObject = JSON.parse(user);
      const decode: decode = jwt_decode(userObject.token);
      if(decode.exp > Math.abs(Date.now()/1000)) {
        return true
      }
      localStorage.removeItem('user');
      return false;
    }
    return false;
  }

}


export interface decode {
  _id: String;
  iat: any;
  exp: any;
  role: String;
  tenantId: String
}
