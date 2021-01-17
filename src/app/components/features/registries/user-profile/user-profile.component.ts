// core Modules
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
// AIDA Services
import { ToastMessage } from '@shared/services/toast-message';
import { RegistriesService } from '@features/registries/service/registries.service';
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';

// 3rd Party Modules
import { JsonConvert } from 'json2typescript';

// rxjs Operators
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

// Utils
import { Languages } from '@utils/data/languages';
import { Atecos } from '@utils/data/atecos';
import { BusinessDimensions } from '@utils/data/business-dimensions';
import { Countries } from '@utils/data/countries';
import { Tags } from '@utils/data/tags';
import { Messages } from '@utils/data/message';
import { regex } from '@utils/regex';

// AIDA Models
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';
import { Contacts } from './../models/contact.model';
import { UserProfile } from './../models/profileUser.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  atecos: any;
  businessDimensions: any;
  changePasswordForm = new FormGroup({});
  contactId: any;
  ContactData:any;
  countries: Array<any>;
  filteredTags: Observable<any[]>;
  isLoading: boolean = false;
  jsonConvert: JsonConvert;
  languages: Array<any>;
  messages: any;
  passSame = false;
  profileForm = new FormGroup({});
  profilePicture: File;
  removable = true;
  selectable = true;
  tags: Array<any>;
  tagArray = new FormArray([]);
  tagValue = new FormControl();
  userForm = new FormGroup({});
  userData: any;
  user: any;
  visible = true;


  constructor(
    private registriesApis: RegistriesService,
    private toast: ToastMessage,
    private fb: FormBuilder,
    private loginInUserData: GetLoggedUserService,
    private ref: ChangeDetectorRef,
  ) {}

  /**
   * Angular Life cycle Hook
   */
  ngOnInit(): void {
    this.initData();
    this.getLoggedInUser();
    this.userFormInIt();
    this.filterTags();
    this.userProfileFormInit();
    this.changePasswordFormInit();
  }

  /**
   * Initialize Static Data
   */
  initData() {
    this.jsonConvert = new JsonConvert();
    this.countries = Countries;
    this.atecos = Atecos;
    this.businessDimensions = BusinessDimensions;
    this.tags = Tags;
    this.messages = Messages.en.profile;
    this.languages = Languages
  }

  /**
   * Initialize change Password Form
   */
  changePasswordFormInit() {
    this.changePasswordForm = this.fb.group({
      password: ['', Validators.required],
      newPass: ['', [Validators.required, Validators.pattern(regex.PASSWORD)]],
      passConfirm: [
        '',
        [Validators.required, Validators.pattern(regex.PASSWORD)],
      ],
    });
  }

  /**
   * To change Password
   */
  changePassword() {
    if(this.passSame) {
      this.isLoading =  true;
      this.registriesApis.updateUserPassword({password: this.changePasswordForm.get('password')?.value, newPassword: this.changePasswordForm.get('newPass')?.value}).subscribe(
        (res: any) => {
          console.log(res);
          this.isLoading = false
          this.changePasswordForm.reset();
          this.changePasswordForm.markAsPristine();
          this.toast.open(this.messages.success.updated, 'Success');
        },
        (err: any) => {
          console.log(err);
          this.isLoading = false;
          this.changePasswordForm.reset();
          this.changePasswordForm.markAsPristine();
          this.toast.open(this.messages.error.unableToUpdate, 'error');
        }
      );
    }
  }

  /**
   * Initialize User Form
   */
  userFormInIt() {
    this.userForm = this.fb.group({
      preferredLanguage: ['', Validators.required],
      defaultRows: [''],
    })
  }

  /**
   * Initialize user form
   */
  userProfileFormInit() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(regex.TITLECASE)]],
      fiscalCode: [''],
      tags: [''],
      bornIn: [''],
      bornOn: [{value: '', disabled: true}],
      address: [''],
      postalCode: [''],
      city: [''],
      province: [''],
      country: ['', Validators.required],
      mobile: ['', [Validators.pattern(regex.PHONE)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(regex.PHONE)]],
      email: ['', [Validators.required, Validators.pattern(regex.EMAIL)]],
      pec: [''],
      website: [''],
      facebookUrl: [''],
      linkedInUrl: [''],
      profilePicture: [''],
    });
    
  }

  /**
   * Get Logged In User details
   */
  getLoggedInUser() {
    this.loginInUserData.getLoginUserData().subscribe((res) => {
      this.user = this.jsonConvert.deserializeObject(res, LoggedInUser);
      this.getUserInfo();
    });
  }

  /**
   * To filter Tags
   */
  filterTags() {
    this.filteredTags = this.tagValue.valueChanges.pipe(
      startWith(null),
      map((val: any) => {
        return val ? this._filter(val) : this.tags.slice();
      })
    );
  }

  /**
   * Get LoggedIn User All Information
   */
  getUserInfo() {
    this.isLoading = true;
    this.registriesApis.getLoggedInUserDetails(this.user.id).subscribe(
      (res: any) => {
        this.ContactData = this.jsonConvert.deserializeObject(res.data[0].contact, Contacts)
        this.userData =  this.jsonConvert.deserialize(res.data[0],UserProfile)
        this.contactId = this.ContactData.id;
        this.profileFormLoadData(this.ContactData)
        this.userFormLoadData(this.userData);
        this.isLoading = false;
        this.toast.open(this.messages.success.get, 'success');
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false
        this.toast.open(this.messages.err.unableToGet, 'error');
      }
    );
  }

  /**
   * Load User Form data
   */
  userFormLoadData(data: any) {
    this.userForm.patchValue({
      preferredLanguage: data.language,
      defaultRows: data.defaultRows
    });
  }

  

  /**
   * Load Profile Form with data
   * @param {Object} data Profile Information
   */
  profileFormLoadData(data: any) {
    this.profileForm.patchValue({
      name: data.name,
      fiscalCode: data.fiscalCode,
      bornIn: data.bornIn,
      bornOn: data.bornOn,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      province: data.province,
      country: data.country,
      mobile: data.mobile,
      phoneNumber: data.phoneNumber,
      email: data.email,
      pec: data.pec,
      website: data.website,
      facebookUrl: data.facebookUrl,
      linkedInUrl: data.linkedInUrl,
      profilePicture: data.profilePicture,
    });
    if(data.tags) {
      data?.tags.forEach((element: any) => {
        (this.tagArray as FormArray).push(new FormControl(element))
      });
    }
  }

  /**
   * To update User Information
   */
  updateUser() {
    if(!this.userForm.dirty){
      return
    }
    if(this.userForm.valid) {
      this.isLoading = true;
      this.registriesApis.updateUser(this.userForm.value).subscribe(
        (res: any) => {
          console.log(res);
          let localUser = localStorage.getItem('user') || '{}'
          let localUserObject = JSON.parse(localUser);
          Object.assign(localUserObject, {userLanguage: this.userForm.get('preferredLanguage')?.value});
          localStorage.setItem('user', JSON.stringify(localUserObject));
          this.registriesApis.registriesSubject.next('languageChange');
          this.userForm.markAsPristine();
          this.isLoading = false;
          this.toast.open(this.messages.success.updated, 'Success');
        },
        (err: any) => {
          console.log(err);
          this.userForm.markAsPristine();
          this.isLoading = false;
          this.toast.open(this.messages.error.unableToUpdate, 'error');

        }
      );
    }
  }

  

  /**
   * To Update Profile Information
   */
  updateContact() {

    if(!this.isFormDirty()) {
      return 
    }
    if(!this.isFormValid()) {
      return
    }
    this.profileForm.patchValue({
      tags : this.tagArray.value
    })
    this.isLoading = true;
    this.registriesApis.updateContact(this.contactId, this.profileForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.isLoading = false;
        this.toast.open(this.messages.success.updated, 'Success');
      },
      (err: any) => {
        this.isLoading = false;
        this.toast.open(this.messages.error.unableToUpdate, 'error');

      }
    );
  }

  /**
   * To update profile Picture
   * @param {Event} e Angular Event 
   */
  profilePictureUpload(e: any) {
    if (e.target.files[0].type.match('image')) {
      this.profilePicture = <File>e.target.files[0];
      const fd = new FormData();
      fd.append('profilePicture', this.profilePicture);
      this.isLoading = true;
      this.registriesApis.updateContactProfilePicture(this.contactId, fd).subscribe((res: any) => {
            this.getUserInfo();
            this.isLoading = false;
            this.toast.open(this.messages.success.updated, 'success');

          }, (err: any) => {
            this.isLoading = false;
            this.toast.open(this.messages.error.unableToUpdate, 'error');
          }
        );
    } else {
      this.toast.open('Please upload a image type file', 'error');
    }
  }

  

  /**
   * To push selected tag into array
   * @param {Event} event Mat Autocomplete Event
   */
  selected(value: any): void {
    if (!this.tagArray.value.includes(value)) {
      (this.tagArray as FormArray).push(new FormControl(value));
      this.updateContact();
    }
  }

  /**
   * To remove the tag at a certain Index
   * @param {Object} tag tag Object
   * @param  i Index
   */
  remove(tag: string, i: any): void {
    (this.tagArray as FormArray).removeAt(i);
    this.profileForm.markAsDirty();
    this.updateContact();
  }

  /**
   * To check weather the new Password and Password Confirm is same
   */
  matchPassword() {
    this.passSame =
      this.changePasswordForm.get('newPass')?.value === this.changePasswordForm.get('passConfirm')?.value ? true : false;
      console.log(this.passSame);
      this.ref.detectChanges();
  }



  /**
   * Is form valid
   */
  isFormValid() {
    return this.profileForm.valid;
  }

  /**
   * Is form dirty
   */
  isFormDirty() {
    return this.profileForm.dirty;
  }

  /**
   * To make the form Pristine
   */
  makeFormPristine() {
    return this.profileForm.markAsPristine();
  }


  

  

  /**
   * To filter the value based on entered Value
   * @param {string} value The entered value in the text Field
   */
  private _filter(value: string): any[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.tags.filter(
      (tag: { id: string; value: string }) =>
        tag?.value.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
