// Core Modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

//AIDA Services
import { RegistriesService } from '@features/registries/service/registries.service';
import { ToastMessage } from '@shared/services/toast-message';
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';

// 3rd Party Modules
import { JsonConvert } from 'json2typescript';
import { Observable } from 'rxjs';


// Models
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';

// Utils
import { Atecos } from '@utils/data/atecos';
import { BusinessDimensions } from '@utils/data/business-dimensions';
import { Countries } from '@utils/data/countries';
import { Messages } from '@utils/data/message';
import { Tags } from '@utils/data/tags';
import { Typology } from '@utils/data/typology';
import { regex } from '@utils/regex';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  atecos: Array<any>;
  addContactFormView: FormGroup;
  businessDimensions: Array<any>;
  contactId: any;
  countries: Array<any>;
  filteredTags: Observable<any[]>;
  isLoading: boolean= false;
  jsonConvert: JsonConvert;
  messages: any;
  managers: any[] = [];
  profilePicture: File;
  tags: Array<any>;
  tagValue = new FormControl('');
  typology: Array<any>;
  tenantId: any;
  userId: any;
  user: any;
  visible = true;
  selectable = true;
  removable = true;
  tagArray = new FormArray([]);

  /**
   * Constructor
   */
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private registriesApis: RegistriesService,
    private toast: ToastMessage,
    private loginInUserData: GetLoggedUserService
  ) {}

  /**
   * Angular Life Cycle Hook
   */
  ngOnInit(): void {
    this.jsonConvert = new JsonConvert();
    this.initData();
    this.addContactFormViewInIt();
    this.messages = Messages.en.contact;
    this.contactId = this.route.snapshot.params.id;
    this.getLoggedInUser();
    this.filterTags();

  }

  /**
   * To filter Tags
   */
  filterTags() {
    this.filteredTags = this.tagValue.valueChanges.pipe(
      startWith(null),
      map((val: any) => {
        return val ? this._filter(val) : this.tags.slice() })
    );
  }

  /**
   * To remove the tag
   * @param tag tag data
   * @param i index
   */
  remove(tag: string, i: any): void {
    (this.tagArray as FormArray).removeAt(i);
    this.addContactFormView.markAsDirty();
    this.updateContactInformation();
  }

  /**
   * To push selected tag into array
   * @param {Event} event Mat Autocomplete Event
   */
  selected(value: any): void {
    if(!this.tagArray.value.includes(value)) {
      (this.tagArray as FormArray).push(new FormControl(value));
      this.updateContactInformation();
    }
  }

  /**
   * Initialize Form
   */
  addContactFormViewInIt() {
    this.addContactFormView = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(regex.TITLECASE)]],
      manager: ['', Validators.required],
      fiscalCode: [''],
      tags: [''],
      bornIn: [''],
      bornOn: [{value: '', disabled: true}],
      address: [''],
      postalCode: [''],
      city: [''],
      province: [''],
      country: ['', Validators.required],
      mobile: ['',[Validators.pattern(regex.PHONE)]],
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
  getLoggedInUser(): void {
    this.loginInUserData.getLoginUserData().subscribe((res) => {
      this.user = this.jsonConvert.deserializeObject(res, LoggedInUser);
      this.getContactInformation();
    });
  }

  /**
   * Get Managers
   */
  getManagers() {
    this.registriesApis
      .getAllAdmin(this.user.tenantId)
      .subscribe((res: any) => {
        this.managers = res.data;
      });
  }

  /**
   * Get Contact Information
   */
  getContactInformation() {
    this.isLoading = true;
    this.registriesApis.getContactById(this.contactId).subscribe((res: any) => {
      this.loadAddContactFormView(res.data[0]);
      this.isLoading = false;
    });
  }

  /**
   * To Load Form with data
   * @param {Object} data Contact Information Object
   */
  loadAddContactFormView(data: any) {
    this.addContactFormView.patchValue({
      name: data?.name,
      mobile: data.mobile,
      manager: data?.manager,
      fiscalCode: data?.fiscalCode,
      // tags: data?.tags,
      bornIn: data?.bornIn,
      bornOn: data?.bornOn,
      address: data?.address,
      postalCode: data?.postalCode,
      city: data?.city,
      province: data?.province,
      country: data?.country,
      phoneNumber: data?.phoneNumber,
      email: data?.email,
      pec: data?.pec,
      website: data?.website,
      facebookUrl: data?.facebookUrl,
      linkedInUrl: data?.linkedInUrl,
      profilePicture: data?.profilePicture,
    });
    if(data.tags) {
      data?.tags.forEach((element: any) => {
        (this.tagArray as FormArray).push(new FormControl(element))
      });
    }
    this.user.tenantId =  data.tenantId || this.user.tenantId;
    this.getManagers();
  }

  /**
   * To upload Profile Picture
   * @param {Event} e Angular Event
   */
  profilePictureUpload(e: any) {
    if (e.target.files[0].type.match('image')) {
      this.isLoading = true;
      this.profilePicture = <File>e.target.files[0];
      const fd = new FormData();
      fd.append('profilePicture', this.profilePicture);
      this.registriesApis.updateContactProfilePicture(this.contactId, fd).subscribe((res: any) => {
            this.getContactInformation();
            this.isLoading = false;
          }, (err: any) => {
            this.toast.open(this.messages.error.unableToGet, 'error');
            this.isLoading = false;
          }
        );
    } else {
      this.toast.open('Please upload a image type file', 'error');
    }
  }

  /**
   * Is form valid
   */
  isFormValid() {
    return this.addContactFormView.valid;
  }

  /**
   * Is form dirty
   */
  isFormDirty() {
    return this.addContactFormView.dirty;
  }

  /**
   * To make the form Pristine
   */
  makeFormPristine() {
    return this.addContactFormView.markAsPristine();
  }

  /**
   * Initialize Data
   */
  initData() {
    this.countries = Countries;
    this.atecos = Atecos;
    this.businessDimensions = BusinessDimensions;
    this.typology = Typology;
    this.tags = Tags;
  }

  /**
   * To update contact Information
   */
  updateContactInformation() {
    if(!this.isFormValid()) {
      return;
    }
    if(!this.isFormDirty()){
      return;
    }

    this.addContactFormView.patchValue({
      tags : this.tagArray.value
    })
    this.tagValue.reset();
    this.isLoading = true;
    this.registriesApis
      .updateContact(this.contactId, this.addContactFormView.value)
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          this.toast.open(this.messages.success.updated, 'success');
        },
        (err: any) => {
          this.isLoading = false;
          this.toast.open(this.messages.error.unableToUpdate, 'error');
        }
      );
  }

  widgetOpen(val: any) {
    if(val === 'call'){
      this.registriesApis.registriesSubject.next({title: 'call', number: this.addContactFormView.get('phoneNumber')?.value});
    }
    if(val === 'mail') {
    this.registriesApis.registriesSubject.next({title: 'mail'});
    }
  }


  /**
   * To filter the value based on entered Value
   * @param {string} value The entered value in the text Field
   */
  private _filter(value: string): any[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.tags.filter(
      (tag: {id: string, value: string}) => tag?.value.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
