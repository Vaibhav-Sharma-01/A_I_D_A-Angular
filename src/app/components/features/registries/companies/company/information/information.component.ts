import { CallingServiceService } from './../../../../../shared/services/call/calling-service.service';
import { Subscription } from 'rxjs';
// Core Modules
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

// 3rd party Module
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs'; 
import { JsonConvert } from 'json2typescript';

// Material Modules
import { MatAutocomplete, } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA} from '@angular/cdk/keycodes';

// AIDA Services
import { RegistriesService } from '@features/registries/service/registries.service';
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';
import { ToastMessage } from '@shared/services/toast-message';

// AIDA Model
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';

// Utils
import { Atecos } from '@utils/data/atecos';
import { BusinessDimensions } from '@utils/data/business-dimensions';
import { Countries } from '@utils/data/countries';
import { regex } from '@utils/regex';
import { Messages } from '@utils/data/message';
import { Tags } from '@utils/data/tags';
import { Typology } from '@utils/data/typology';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit {
  atecos: Array<any>;
  addCompanyFormView: FormGroup;
  businessDimensions: Array<any>;
  companyId: any;
  companyLogo: File;
  countries: Array<any>;
  filteredTags: Observable<any[]>;
  isLoading: boolean = false;
  isSlideOpen: boolean = false;
  jsonConvert: JsonConvert;
  managers: any[] = [];
  messages: any;
  removable = true;
  selectable = true;
  separatorKeysCodes: number[] = [COMMA];
  slideUpGeneral: string;
  subscription: Subscription;
  tagValue = new FormControl('');
  tagArray = new FormArray([]) ;
  tags: Array<any>;
  typology: Array<any>;
  tenantId: any;
  user: any;
  visible = true;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('featureSlideUpElm')  featureEl:ElementRef;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  /**
   * Constructor
   */
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private registriesService: RegistriesService,
    private toast: ToastMessage,
    private loginInUserData: GetLoggedUserService,
    private callService: CallingServiceService
  ) {}

  /**
   * Angular Life cycle hook
   */
  ngOnInit(): void {
    this.companyId = this.route.snapshot.params.id;
    this.jsonConvert = new JsonConvert();
    this.getLoggedInUser();
    this.subscribeRegistriesSubjectChanges();
    this.initData();
    this.companyFormInit();
    this.filterTags();
  }

  subscribeRegistriesSubjectChanges() {
    this.subscription = this.registriesService.registriesSubject.subscribe(
      (res: any) => {
        if(res=='closeCall') {
          this.isSlideOpen = false;
        }
      }
    );
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
   * Initialize Data
   */
  initData() {
    this.countries = Countries;
    this.atecos = Atecos;
    this.businessDimensions = BusinessDimensions;
    this.typology = Typology;
    this.tags = Tags;
    this.messages = Messages.en.company;
  }

  /**
   * Is form valid
   */
  isFormValid() {
    return this.addCompanyFormView.valid;
  }

  /**
   * Is form dirty
   */
  isFormDirty() {
    return this.addCompanyFormView.dirty;
  }

  /**
   * To make the form Pristine
   */
  makeFormPristine() {
    return this.addCompanyFormView.markAsPristine();
  }

  /**
   * To add Entered vale into the array
   * @param {Event} event Mat Chip Input Event
   */
  add(event: MatChipInputEvent): void {
    const value = event.value;

    if ((value || '').trim()) {
      (this.tagArray as FormArray).push(new FormControl(value));
    }
  }

  remove(tag: string, i: any): void {
    (this.tagArray as FormArray).removeAt(i);
    this.addCompanyFormView.markAsDirty();
    this.updateCompany();
  }

  /**
   * To push selected tag into array
   * @param {Event} event Mat Autocomplete Event
   */
  selected(value: string): void {
    if(!this.tagArray.value.includes(value)) {
      (this.tagArray as FormArray).push(new FormControl(value));
      this.addCompanyFormView.markAsDirty();
      this.updateCompany();
    }
  }

  /**
   * To update Company Logo
   * @param {Event} e Event Launched in Angular
   */
  updateCompanyLogo(e: any) {
    const event = e.target.files[0];
    if (event.type.match('image')) {
      this.companyLogo = <File>event;
      const fd = new FormData();
      fd.append('companyLogo', this.companyLogo);
      this.isLoading = true;
      this.registriesService.updateCompanyLogo(this.companyId, fd).subscribe(
        (res: any) => {
          this.getCompanyInformation();
          this.addCompanyFormView.markAsPristine();
        },
        (err: any) => {
          this.isLoading = false;
          this.toast.open(this.messages.error.unableToUpdate, 'error');
        }
      );
    } else {
      this.toast.open(this.messages.error.unableToUpdate, 'error');
    }
  }

  /**
   * Get Logged In user details
   */
  getLoggedInUser() {
    this.loginInUserData.getLoginUserData().subscribe((res: any) => {
      this.user = this.jsonConvert.deserializeObject(res, LoggedInUser);
      this.getCompanyInformation();
    });
  }

  /**
   * Initialize Company Form
   */
  companyFormInit() {
    this.addCompanyFormView = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(regex.TITLECASE)]],
      typology: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      ateco: [''],
      notes: [''],
      vatNumber: [''],
      fiscalCode: [''],
      sdiCode: [''],
      reaCode: [''],
      tags: [''],
      companyLogo: [''],
      numberOfEmployees: [''],
      businessDimension: [],
      dataConstituzione: [{value: '', disabled: true}],
      address: [''],
      postalCode: [''],
      city: [''],
      province: [''],
      region: [''],
      country: [''],
      phoneNumber: ['',[Validators.required, Validators.pattern(regex.PHONE)]],
      optionalPhoneNumber: ['', [Validators.pattern(regex.PHONE)]],
      fax: [''],
      email: ['', [Validators.required, Validators.pattern(regex.EMAIL)]],
      additionalEmail: ['',[Validators.pattern(regex.EMAIL)]],
      pec: [''],
      website: [''],
      facebookUrl: [''],
      linkedInUrl: [''],
    });
  }

  /**
   * Get All managers of the Tenant
   * @param {string} id Tenant Id
   */
  getManagers(id: any) {
    this.registriesService.getAllAdmin(id).subscribe((res: any) => {
      this.managers = res.data;
    });
  }

  /**
   * Get Company Information
   */
  getCompanyInformation() {
    this.isLoading = true;
    this.registriesService
      .getComapnyInformation(this.companyId)
      .subscribe((res: any) => {
        this.isLoading = false;
        if (res.hasOwnProperty('data')) {
          const company = res.data[0];
          this.addCompanyFormView.patchValue({
            name: company.name,
            typology: company.typology,
            manager: company.manager,
            ateco: company.ateco,
            notes: company.notes,
            vatNumber: company.vatNumber,
            fiscalCode: company.fiscalCode,
            sdiCode: company.sdiCode,
            reaCode: company.reaCode,
            // tags: company.tags,
            companyLogo: company.companyLogo,
            numberOfEmployees: company.numberOfEmployees,
            businessDimension: company.businessDimension,
            dataConstituzione: company.dataConstituzione,
            address: company.address,
            postalCode: company.postalCode,
            city: company.city,
            province: company.province,
            region: company.region,
            country: company.country,
            phoneNumber: company.phoneNumber,
            optionalPhoneNumber: company.optionalPhoneNumber,
            fax: company.fax,
            email: company.email,
            additionalEmail: company.additionalEmail,
            pec: company.pec,
            website: company.website,
            facebookUrl: company.facebookUrl,
            linkedInUrl: company.linkedInUrl,
          });
          if(company.tags) {
            company.tags.forEach((element: any) => {
              (this.tagArray as FormArray).push(new FormControl(element))
            });
          }
          this.makeFormPristine();
          this.user.tenantId = company.tenantId || this.user.tenantId
        }
        this.getManagers(this.user.tenantId);
      });
  }

  /**
   * update Company Record;
   */
  updateCompany() {
    if (!this.isFormDirty()) {
      return;
    }

    if(!this.isFormValid()) {
      return;
    }
    this.addCompanyFormView.patchValue({
      tags: this.tagArray.value
    });
    this.isLoading = true;
    this.registriesService
      .updateCompany(this.companyId, this.addCompanyFormView.value)
      .subscribe(
        (res: any) => {
          this.makeFormPristine();
          this.isLoading = false;
          this.toast.open('Update Successful', 'success');
        },
        (err: any) => {
          this.makeFormPristine();
          this.isLoading = false;
          this.toast.open(err.message, 'error');
        }
      );
  }

  slideUp(type: any): void {
    this.slideUpGeneral = type;
    this.isSlideOpen = !this.isSlideOpen;
    if (type === 'email') {
      this.featureEl.nativeElement.style.background = "#232324";
      this.featureEl.nativeElement.style.width = "800px";
      this.featureEl.nativeElement.style.height = "700px";
    } else if (type === 'phone') {
      this.featureEl.nativeElement.style.background = "#232324";
      this.featureEl.nativeElement.style.width = "400px";
      this.featureEl.nativeElement.style.height = "600px";
      this.registriesService.registriesSubject.next({title: 'call', number: this.addCompanyFormView.get('phoneNumber')?.value})
    }
  }

  widgetOpen(val: any) {
    if(val === 'call'){
      this.registriesService.registriesSubject.next({title: 'call', number: this.addCompanyFormView.get('phoneNumber')?.value});
    }
    if(val === 'mail') {
    this.registriesService.registriesSubject.next({title: 'mail'});
    }
  }

  /**
   * To filter the value based on entered Value
   * @param {string} value The entered value in the text Field
   */
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter(
      (tag: {id: string, value: string}) => tag?.value.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
