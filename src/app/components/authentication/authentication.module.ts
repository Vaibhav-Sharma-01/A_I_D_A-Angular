import { HttpClient, HttpClientModule } from '@angular/common/http';
// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// AIDA Modules
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '@shared/shared.module';

// AIDA Components
import { AuthenticationComponent } from './authentication.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordStepFirstComponent } from './forgot-password/forgot-password-step-first/forgot-password-step-first.component';
import { ForgotPasswordStepSecondComponent } from './forgot-password/forgot-password-step-second/forgot-password-step-second.component';

// 3rd PArty Module
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignupComponent,
    ForgotPasswordStepFirstComponent,
    ForgotPasswordStepSecondComponent,
    ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
            return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
    }
    })
  ]
})
export class AuthenticationModule { }
