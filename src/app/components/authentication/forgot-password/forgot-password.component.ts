// Core Modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// AIDA Services
import { AuthService } from './../service/auth-service.service';
import { ToastMessage } from '@shared/services/toast-message';

// Utils
import { regex } from '@utils/regex';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any;
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastMessage
  ) { }

  /**
   * Angular Life Cycle Hook
   */
  ngOnInit(): void {
    this.initForgotPasswordForm();
  }

   /**
   * Is form valid
   */
  isFormValid() {
    return this.forgotPasswordForm.valid;
  }

  /**
   * Is form dirty
   */
  isFormDirty() {
    return this.forgotPasswordForm.dirty;
  }

  /**
   * To make the form Pristine
   */
  makeFormPristine() {
    return this.forgotPasswordForm.markAsPristine();
  }

  /**
   * Initialize Forgot Password Form
   */
  initForgotPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required,Validators.pattern(regex.EMAIL)]],
    });
  }


  /**
   * Forgot Password main Method
   */
  forgotPassword() {
    if(!this.isFormValid()) {
      return;
    }
    if(!this.isFormDirty()) {
      return;
    }
    this.loader = true;
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('userEmail', this.forgotPasswordForm.value.email);
        this.router.navigateByUrl('/auth');
        this.toast.open('link sent to email','close')
      },
      (err: any) => {
        console.error(err);
        this.toast.open('Email not sent', 'close');
        this.loader = false
      }
    );
  }

}
