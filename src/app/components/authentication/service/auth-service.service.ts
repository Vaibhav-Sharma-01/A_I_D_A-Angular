// Core Modules
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// 3rd Party modules
import { Observable, Subject } from 'rxjs';

// Environment
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  /**
   * subject
   */
  public authSubject = new Subject<any>();

  /**
   * Urls
   */
  private url = environment.apiUrl;
  private loginURL = `${this.url}/token`;
  private signupURL = `${this.url}/register`;
  private forgotPasswordURL = `${this.url}/forgot-password`;
  private validateOTPURL = `${this.url}/validate-otp`;
  private changePasswordURL = `${this.url}/change-password`;

  /**
   * Login Credentials
   * @param credentials Login credentials
   */
  public login( credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(this.loginURL, credentials);
  }

  public register( userData: any): Observable<any> {
    return this.http.post(this.signupURL, userData);
  }

  /**
   * To send Email to user if user forgets his password
   * @param email user Email
   */
  public forgotPassword( email: {email: string}): Observable<any> {
    return this.http.post(this.forgotPasswordURL, email);
  }

  public validateOPT(data: any) {
    return this.http.post(this.validateOTPURL,data);
  }

  /**
   * To change the password
   * @param data New Password Information
   */
  public changePassword(data: any) {
    return this.http.post(this.changePasswordURL,data);
  }
}
