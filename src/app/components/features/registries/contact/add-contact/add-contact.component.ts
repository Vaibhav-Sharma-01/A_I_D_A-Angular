import { regex } from '@utils/regex';
// Core Modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

// 3rd Party Packages
import { JsonConvert } from 'json2typescript';

//Models
import { CreateContact } from './../../models/create-contact.model';
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';
import { Managers } from '@features/registries/models/manager.model';

//AIDA Services
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';
import { RegistriesService } from '@features/registries/service/registries.service';
import { ToastMessage } from '@shared/services/toast-message';

// Utils
import { Countries } from '@utils/data/countries'; 
import { Messages } from '@utils/data/message';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  addContactForm: FormGroup;
  contact: any;
  countryValue = new FormControl('');
  filteredCountry: Observable<any[]>;
  isLoading: boolean = false;
  jsonConvert: JsonConvert;
  managers: any;
  messages: any;
  user: any;
  countries = Countries;

  /**
   * Constructor
   */
  constructor(
    private fb: FormBuilder,
    private registriesApis: RegistriesService,
    private loginInUserData: GetLoggedUserService, 
    private toast: ToastMessage
  ) { }

  /**
   * Angular Life cycle Hooks
   */
  ngOnInit(): void {
    this.messages = Messages.en.contact;
    this.jsonConvert = new JsonConvert();
    this.addContactFormInit();
    this.getManagers();
    this.filterCountry();
  }

  filterCountry() {
    this.filteredCountry = this.countryValue.valueChanges.pipe(
      startWith(''), map((value: any)=> this._filter(value))
    );
  }

  /**
   * Initialize the Add Contact Form
   */
  addContactFormInit(): void {
    this.addContactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(regex.TITLECASE)]],
      email: ['', [Validators.required, Validators.pattern(regex.EMAIL)]],
      manager: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(regex.PHONE)]],
      country: ['', Validators.required],
    });
  }

  selectCountry(val: any) {
    console.log(val);
    this.addContactForm.patchValue({
      country: val.name
    });
  }

  /**
   * To Get Managers 
   */
  getManagers(): void {
    this.loginInUserData.getLoginUserData().subscribe((res) => {
      this.user = this.jsonConvert.deserializeObject(res, LoggedInUser);
      this.registriesApis.getAllAdmin(this.user.tenantId).subscribe(
        (res: any) => {
          this.managers = this.jsonConvert.deserialize(res.data, Managers);
          this.addContactForm.patchValue({
            manager: this.user.id,
          });
        },
        (err: any) => {
          this.toast.open(`${this.messages.error.unableToGet} Managers`, 'error')
        }
      );
    });
  }

  /**
   * Is form valid
   */
  isFormValid(): boolean {
    return this.addContactForm.valid;
  }

  /**
   * Is form dirty
   */
  isFormDirty(): boolean {
    return this.addContactForm.dirty;
  }

  /**
   * Make Form Pristine
   */
  makeFormPristine(): void {
    return this.addContactForm.markAsPristine();
  }

  /**
   *  To create Contact
   */
  createContact(): void {
    if (this.isFormValid()) {
      this.contact = this.jsonConvert.deserializeObject(
        this.addContactForm.value,
        CreateContact
      );
      this.isLoading = true;
      Object.assign(this.contact, {tenantId: this.user.tenantId, userId: this.user.id});
      this.registriesApis.createContact(this.contact).subscribe(
        (res: any) => {
          this.registriesApis.registriesSubject.next('closeContact');
          this.isLoading = false;
          this.toast.open(this.messages.success.added, 'close')
        },
        (err: any) => {
          this.isLoading = false;
          this.toast.open(this.messages.error.unableToAdd, 'close');
        }
      );
    }
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
