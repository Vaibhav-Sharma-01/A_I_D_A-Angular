// Core Modules
import { Component, OnInit } from '@angular/core';

// AIDA Services
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';

// 3rd Party Module
import { JsonConvert } from 'json2typescript';

// Models
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  jsonConvert: JsonConvert;
  user: any;

  /**
   * Constructor
   */
  constructor(
    private loginInUserData: GetLoggedUserService
  ) { }

  /**
   * Lifecycle hooks
   */
  ngOnInit(): void {
    this.jsonConvert = new JsonConvert();
    this.getUserInfo();
  }

  /**
   * Get logged in user information
   */
  getUserInfo() {
    this.loginInUserData.getLoginUserData().subscribe(res => {
      this.user = this.jsonConvert.deserializeObject(res, LoggedInUser);
    })
  }

  /**
   * Logout
   */
  logout() {
    localStorage.removeItem('user');
  }
}
