import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm = new FormGroup({});
  startDate = new Date(1990, 0, 1);
  

  constructor() { }

  ngOnInit(): void {
    this.userProfileFormInit();
  }

  userProfileFormInit() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl(''),
      phone: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      dob: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      facebook: new FormControl(''),
      linkedin: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
      sphone: new FormControl(''),
      pec: new FormControl(''),
      pcode: new FormControl('',Validators.required),
      fcode: new FormControl(''),
      gender: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
    });
  }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  updateproimg(){
    console.warn(this.profileForm.value);
  }

}
