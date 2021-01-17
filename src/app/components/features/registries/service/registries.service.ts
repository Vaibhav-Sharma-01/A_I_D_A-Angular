// Core Modules
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// 3rd Party modules
import { Subject } from 'rxjs';

// Environment
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistriesService {

  /**
   * Constructor
   */
  constructor(private http: HttpClient) { }

  public registriesSubject  = new Subject<any>();

  private url = environment.apiUrl;
  private CompanyURL = `${this.url}/company`;
  private getAllAdminUserURL = `${this.url}/user/admin`;
  private getAllCompanyByuserId = `${this.url}/company`;
  private ContactURL = `${this.url}/contact`;
  private tenantURL = `${this.url}/tenant`;
  private userUrl = `${this.url}/user`;
  private callUrl = `${this.url}/trigger-call`
  private mailUrl = `${this.url}/send`;
  private capabilityTokenUrl = `${this.url}/capability-token`


  public createCompany(data: any) {
    return this.http.post(this.CompanyURL, data);
  }

  public getAllCompanies(tenantId: any, userId: any) {
    return this.http.get(`${this.getAllCompanyByuserId}/${tenantId}/${userId}`);
  }

  public getAllAdmin(tenantId: any) {
    return this.http.get(`${this.getAllAdminUserURL}/${tenantId}`);
  }
  public getComapnyInformation(id: any) {
    return this.http.get(`${this.CompanyURL}/${id}`);
  }

  public deleteCompanyById(id: any) {
    return this.http.delete(`${this.CompanyURL}/${id}`);
  }

  public updateCompany(id: any, data: any) {
    return this.http.put(`${this.CompanyURL}/${id}`, data);
  }

  public createContact(data: any) {
    return this.http.post(this.ContactURL,data);
  }
  public deleteContactById(id: any) {
    return this.http.delete(`${this.ContactURL}/${id}`);
  }

  public getAllContact(tenantId: any, userId: any) {
    return this.http.get(`${this.ContactURL}/${tenantId}/${userId}`);
  }

  public getContactById(id: any) {
    return this.http.get(`${this.ContactURL}/${id}`);
  }

  public updateContact(id: any,data: any) {
    return this.http.put(`${this.ContactURL}/${id}`, data);
  }

  public updateContactProfilePicture(id: String, data: FormData) {
    return this.http.patch(`${this.ContactURL}/updatePicture/${id}`, data);
  }

  public createTenantAndAdminUser(data: any) {
    return this.http.post(this.tenantURL,data);
  }
  public getAllTenants() {
    return this.http.get(this.tenantURL);
  }

  public getTenantById(id:any) {
    return this.http.get(`${this.tenantURL}/${id}`);
  }

  public updateCompanyLogo(id: any, data: any) {
    return this.http.patch(`${this.CompanyURL}/${id}`,data );
  }

  public updateTenant(id: any, data: any) {
    return this.http.patch(`${this.tenantURL}/${id}`,data);
  }

  public updateTenantAdminPermission(id:any, data: any) {
    return this.http.patch(`${this.userUrl}/${id}`,data);
  }

  public getLoggedInUserDetails (id: any) {
    return this.http.get(`${this.userUrl}/${id}`);
  }

  public updateUser(data: any) {
    return this.http.put(`${this.userUrl}`, data);
  }

  public updateUserPassword(data: any) {
    return this.http.put(`${this.userUrl}/change-password`, data);
  }

  public callPhone(data: any) {
    console.log('trigger call');
    return this.http.post(this.callUrl, data);
  }

  public getCapabilityToken() {
    console.log('capability token ');
    return this.http.get(`${this.capabilityTokenUrl}/`);
  }

  public sendEmail(data: any) {
    return this.http.post(this.mailUrl, data);
  }
}
