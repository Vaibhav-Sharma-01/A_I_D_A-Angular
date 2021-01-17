import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../service/auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: any;
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm() {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      password:[''],
      passwordConfirm:['']
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration:1000,
    });
  }

  signup() {
    this.loader = true;
    this.authService.register(this.signupForm.value).subscribe(
      (res: any) => {
        this.openSnackBar('user created', 'close');
        this.router.navigateByUrl('');
      },
      (err: any) => {
        console.error(err);
        this.openSnackBar('Failed', 'close');
        this.loader = false;
      }
    );
  }
}
