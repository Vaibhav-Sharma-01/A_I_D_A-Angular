// Core Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// AIDA Components
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordStepFirstComponent } from './forgot-password/forgot-password-step-first/forgot-password-step-first.component';
import { ForgotPasswordStepSecondComponent } from './forgot-password/forgot-password-step-second/forgot-password-step-second.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'step-1', component: ForgotPasswordStepFirstComponent},
  { path: 'step-2/:id', component: ForgotPasswordStepSecondComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
