import { regex } from '@utils/regex';
// Core Modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// AIDA Services
import { AuthService } from './../../service/auth-service.service';
import { ToastMessage } from '@shared/services/toast-message';



@Component({
  selector: 'app-forgot-password-step-second',
  templateUrl: './forgot-password-step-second.component.html',
  styleUrls: ['./forgot-password-step-second.component.scss']
})
export class ForgotPasswordStepSecondComponent implements OnInit {

  changePasswordForm: any;
  loader: boolean = false;
  tempId: String;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastMessage,
    private route: ActivatedRoute
  ) { }

  /**
   * Angular Life Cycle Hook
   */
  ngOnInit(): void {
    this.tempId = this.route.snapshot.params.id;
    this.initChangePasswordForm();
  }

  /**
   * Is form valid
   */
  isFormValid() {
    return this.changePasswordForm.valid;
  }

  /**
   * Is form dirty
   */
  isFormDirty() {
    return this.changePasswordForm.dirty;
  }

  /**
   * To make the form Pristine
   */
  makeFormPristine() {
    return this.changePasswordForm.markAsPristine();
  }

  /**
   * Initialize the Change Password Form
   */
  initChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      email: [''],
      tempId: [this.tempId, Validators.required],
      newPass: ['',[Validators.required, Validators.pattern(regex.PASSWORD)]],
      passConfirm: ['', [Validators.required, Validators.pattern(regex.PASSWORD)]],
    });
  }

  /**
   * matches nwe Password and confirm Password to be same
   */
  checkPassword() {
    if( this.changePasswordForm.value.newPass === this.changePasswordForm.value.passConfirm && this.changePasswordForm.value.newPass!= '') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Change Password Main Method
   */
  changePassword() {
    if(!this.isFormDirty) {
      return
    }
    if(!this.isFormValid){
      return
    }
    let result = this.checkPassword();
    console.log(result);
    if(result) {
    this.loader = true;
      this.changePasswordForm.patchValue({
        email: localStorage.getItem('userEmail'),
        tempId: this.tempId
      });
      delete this.changePasswordForm.value.passConfirm;
      this.authService.changePassword(this.changePasswordForm.value).subscribe(
        (res: any) => {
          this.toast.open('Password changed successfully', 'close');
          this.router.navigateByUrl('');
        },
        (err: any) => {
          this.changePasswordForm.reset();
          this.toast.open('Failed to change password', 'close');
          this.loader = false;
        }
      );
    } else {
      this.loader = false;
      this.changePasswordForm.reset();
      this.toast.open('new password and password confirm is not same', 'close');
    }
    
  }
}
