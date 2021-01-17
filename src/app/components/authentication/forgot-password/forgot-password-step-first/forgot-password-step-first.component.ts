import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-step-first',
  templateUrl: './forgot-password-step-first.component.html',
  styleUrls: ['./forgot-password-step-first.component.scss']
})
export class ForgotPasswordStepFirstComponent implements OnInit {
  loginForm: any;
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration:1000,
    });
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [''],
      otp: [''],
    });
  }

  validateOtp() {
    this.loader = true;
    this.loginForm.patchValue({
      email:localStorage.getItem('userEmail')
    });
    this.authService.validateOPT(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('userTempId', res.data[0].temp_id);
        this.router.navigateByUrl('/step-2');
        this.openSnackBar('Otp verification successful', 'close');
      },
      (err: any) => {
        this.openSnackBar('otp verification failed, Please enter corrent OTP', 'close');
        this.loader = false;
      }
    );
  }

}
