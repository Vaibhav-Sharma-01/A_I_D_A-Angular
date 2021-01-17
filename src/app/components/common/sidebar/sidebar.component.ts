import { JsonConvert } from 'json2typescript';
import { Component, OnInit } from '@angular/core';
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  jsonConvert: JsonConvert
  user: any

  constructor(
    private loginInUserData: GetLoggedUserService
  ) { }

  ngOnInit(): void {
    this.jsonConvert = new JsonConvert();
    this.getLoggedInUser()
  }

  getLoggedInUser() {
    this.loginInUserData.getLoginUserData().subscribe((res: any) => {
      this.user = this.jsonConvert.deserializeObject(res, LoggedInUser);
    });
  }

}
