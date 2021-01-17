// core Modules
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

// AIDA services
import { AuthService } from './components/authentication/service/auth-service.service';
import { RegistriesService } from './components/features/registries/service/registries.service';
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';

// 3rd party Modules
import { TranslateService } from '@ngx-translate/core';
import { JsonConvert } from 'json2typescript';

// Rxjs Operators
import { Subscription } from 'rxjs';

// AIDA Models
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  callingNumber: String;
  callUp: boolean = true;
  jsonConvert: JsonConvert;
  mailUp: boolean = true;
  open: boolean = false;
  openCalling: boolean = false;
  openMail: boolean = false;
  preferredLanguage = 'en';
  subscription1: Subscription;
  title = 'aida-next';
  user: any;

  /**
   * View Child
   */
  @ViewChild('featureSlideUpElmCall') featureElCall: ElementRef;
  @ViewChild('featureSlideUpElmMail') featureElMail: ElementRef;
  @ViewChild('featureSlideUpElm') featureEl: ElementRef;

  /**
   * class Constructor
   */
  constructor(
    private translateService: TranslateService,
    private loginInUserData: GetLoggedUserService,
    private registriesService: RegistriesService,
    private authService: AuthService
  ) {}

  /**
   * Angular Life Cycle Hook
   */
  ngOnInit() {
    this.jsonConvert = new JsonConvert();
    this.subscribeRegistriesSubjectEmits();
    this.subscribeAuthSubject();
    this.getLoggedInUser();
  }

  /**
   * emit close pop up message
   */
  close(val: String) {
    this.registriesService.registriesSubject.next(val)
  }

  /**
   * get Logged In user details
   */
  getLoggedInUser() {
    this.loginInUserData.getLoginUserData().subscribe(
      (res: any) => {
        this.user = this.jsonConvert.deserialize(res, LoggedInUser);
        if (!this.user.language) {
          this.translateService.setDefaultLang('en');
        } else {
          this.translateService.addLangs(['en', 'es', 'it']);
          this.preferredLanguage = this.user.language;
          this.translateService.setDefaultLang(this.preferredLanguage);
        }
      },
      (err: any) => {}
    );
  }


  /**
   * Subscribe to Authentication subject emits
   */
  subscribeAuthSubject() {
    this.subscription1 =  this.authService.authSubject.subscribe((res: any) => {
      if (res === 'loggedIn') {
        this.getLoggedInUser();
      }
    });
  }


  /**
   * subscribe to registries Subject emits
   */
  subscribeRegistriesSubjectEmits() {
    this.subscription1 = this.registriesService.registriesSubject.subscribe(
      (res: any) => {
        if (res?.title === 'call') {
          this.callingNumber = res.number;
          this.open = true;
          this.openMail = false;
          this.openCalling = true;
          this.featureEl.nativeElement.style.background = '#232324';
          this.featureEl.nativeElement.style.width = '400px';
          this.featureEl.nativeElement.style.height = '600px';
        }
        if (res?.title === 'mail') {
          this.open = true;
          this.openMail = true;
          this.openCalling = false;
          this.featureEl.nativeElement.style.background = '#FFFFFF';
          this.featureEl.nativeElement.style.width = '800px';
          this.featureEl.nativeElement.style.height = '700px';
        }
        if (res === 'closeCall' || res === 'closeMail') {
          this.open = false;
        }
      }
    );
  }

  
  /**
   * Angular Life cycle hook
   */
  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
