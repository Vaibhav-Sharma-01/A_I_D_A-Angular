// Core Modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Utils
import { regex } from '@utils/regex';

// AIDA Services
import { AuthService } from './../service/auth-service.service';
import { ToastMessage } from '@shared/services/toast-message';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: ToastMessage
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('userTempId');
    this.initLoginForm();
  }

   /**
   * Is form valid
   */
  isFormValid() {
    return this.loginForm.valid;
  }

  /**
   * Is form dirty
   */
  isFormDirty() {
    return this.loginForm.dirty;
  }

  /**
   * To make the form Pristine
   */
  makeFormPristine() {
    return this.loginForm.markAsPristine();
  }


  /**
   * Initialize the Login Form
   */
  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.pattern(regex.EMAIL)]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Login Method
   */
  login() {
    if(! this.isFormDirty()) {
      return;
    }
    if(!this.isFormValid()){
      return;
    }
    this.loader = true;
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.data[0]));
        localStorage.removeItem('userEmail');
        this.toast.open('Login Successful', 'close');
        this.authService.authSubject.next('loggedIn');
        this.router.navigateByUrl('/dashboard');
      },
      (err: any) => {
        this.loginForm.reset();
        this.toast.open('Invalid credentials', 'close');
        this.loader = false;
      }
    );
  }
}
