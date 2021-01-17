import { JsonConvert } from 'json2typescript';
import { RegistriesService } from '@features/registries/service/registries.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';

@Component({
  selector: 'app-registries',
  templateUrl: './registries.component.html',
  styleUrls: ['./registries.component.scss']
})
export class RegistriesComponent implements OnInit {
jsonConvert: JsonConvert
    user: any;
  constructor(
    private loginInUserData: GetLoggedUserService,
    private translateService: TranslateService,
    private registriesService: RegistriesService
    ) { }

  ngOnInit(): void {
    console.log('Hello from Registries');
    this.jsonConvert = new JsonConvert();
    this.subscribeRegistriesSubject();
    this.getLoggedInUser();
  }

  subscribeRegistriesSubject() {
    this.registriesService.registriesSubject.subscribe(
      (res: any) => {
        console.log(res);
        if(res === 'languageChange') {
          this.getLoggedInUser()
        }
      }
    );
  }

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
