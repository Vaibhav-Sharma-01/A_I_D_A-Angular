import {TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
  }

}
