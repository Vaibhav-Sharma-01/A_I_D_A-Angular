// Core Modules
import { Component, OnInit } from '@angular/core';

// AIDA Services
import { RegistriesService } from '@features/registries/service/registries.service';
import { TranslateService } from '@ngx-translate/core';
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';

// Models
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';

// 3rd Party Module 
import { JsonConvert } from 'json2typescript';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  jsonConvert: JsonConvert;
  user: any;

  constructor(
    private loginInUserData: GetLoggedUserService,
    private translateService: TranslateService,
    private registriesService: RegistriesService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userTempId');
    this.jsonConvert = new JsonConvert();
    this.subscribeRegistriesSubject();
    this.getLoggedInUser();
  }

  /**
   * Subscribe to Registries Subject Emits
   */
  subscribeRegistriesSubject() {
    this.registriesService.registriesSubject.subscribe((res: any) => {
      console.log(res);
      if (res === 'languageChange') {
        this.getLoggedInUser();
      }
    });
  }

  /**
   * Get Logged In User Information
   */
  getLoggedInUser() {
    this.loginInUserData.getLoginUserData().subscribe(
      (res: any) => {
        this.user = this.jsonConvert.deserialize(res, LoggedInUser);
        if (this.user.language == '') {
          this.translateService.setDefaultLang('en');
        } else {
          this.translateService.addLangs(['en', 'es', 'it']);
          this.translateService.setDefaultLang(this.user.language);
        }
      },
      (err: any) => {}
    );
  }
}
