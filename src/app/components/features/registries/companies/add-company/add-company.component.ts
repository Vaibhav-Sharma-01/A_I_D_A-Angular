// Core Modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

// 3rd Party Module
import { JsonConvert } from 'json2typescript';

// 3rd Party Service
import { TranslateService } from '@ngx-translate/core';


// Models
import { CreateCompany } from '../../models/create-company.model';
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';
import { Managers } from '../../models/manager.model';

// AIDA Module
import { ToastMessage } from '@shared/services/toast-message';

// Utils
import { Countries } from '@utils/data/countries'; 
import { Messages } from '@utils/data/message';
import { regex } from '@utils/regex';

// AIDA Services
import { RegistriesService } from './../../service/registries.service';
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';

// rxjs Operators
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Interface
interface ICompanyIndustries {
  id: string;
  value: string;
}

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  addCompanyForm: FormGroup;
  company: any;
  countryValue = new FormControl('')
  filteredCountry: Observable<any[]>;
  isLoading: boolean = false;
  jsonConvert: JsonConvert;
  managers: any;
  messages: any;
  user: any;
  preferredLanguage: String = 'en';

  companyIndustries: ICompanyIndustries[] = [
    { id: '1', value: 'S.P.A' },
    { id: '2', value: 'S.R.L' },
    { id: '3', value: 'S.S' },
    { id: '4', value: 'S.E' },
  ];

  countries = Countries;

  /**
   * Constructor
   */
  constructor(
    private fb: FormBuilder,
    private loginInUserData: GetLoggedUserService,
    private registriesApis: RegistriesService,
    private toast: ToastMessage,
    private translateService: TranslateService
  ) { }

  /**
   * Lifecycle hooks
   */
  ngOnInit(): void {
    this.jsonConvert = new JsonConvert();
    this.addCompanyFormInit();
    this.getManagers();
    this.messages = Messages.en;
    this.countryFilter();
  }

  countryFilter() {
    this.filteredCountry = this.countryValue.valueChanges.pipe(
      startWith(''), map((value: any) => this._filter(value) )
    );
  }

  /**
   * Add company form init
   */
  addCompanyFormInit() {
    this.addCompanyForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(regex.TITLECASE)]],
      email: ['', [Validators.required, Validators.pattern(regex.EMAIL)]],
      manager: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern(regex.PHONE)]],
      typology: ['', Validators.required],
      country: ['', Validators.required],
      vatNumber: ['', Validators.required],
    });
  }

  /**
   * Is form valid
   */
  isFormValid() {
    return this.addCompanyForm.valid;
  }

  /**
   * Is form dirty
   */
  isFormDirty() {
    return this.addCompanyForm.dirty;
  }

  /**
   * To make form Pristine
   */
  makeFormPristine(){
    return this.addCompanyForm.markAsPristine();
  }

  /**
   * Get Managers
   */
  getManagers() {
    this.loginInUserData.getLoginUserData().subscribe((res) => {
      this.user = this.jsonConvert.deserializeObject(res, LoggedInUser);
      this.preferredLanguage = this.user?.preferredLanguage;
      this.registriesApis.getAllAdmin(this.user.tenantId).subscribe(
        (res: any) => {
          this.managers = this.jsonConvert.deserialize(res.data, Managers);
          this.addCompanyForm.patchValue({
            manager: this.user.id,
          });
        },
        (err: any) => {
          this.toast.open(this.messages.company.error.unableToGet, 'error');
        }
      );
    });
  }

  /**
   * Create Company
   */
  createCompany() {
    if (!this.isFormValid()) {
      return;
    }
    this.isLoading = true;
    this.company = this.jsonConvert.deserializeObject(this.addCompanyForm.value, CreateCompany);
    Object.assign(this.company, { tenantId: this.user.tenantId, userId: this.user.id });
    this.registriesApis.createCompany(this.company).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.registriesApis.registriesSubject.next('closeCompany');
        this.toast.open(this.messages.company.error.added, 'success');
      },
      (err: any) => {
        this.isLoading = false;
        this.toast.open(this.messages.company.error.unableToAdd, 'error');
      }
    );
  }

  /**
   * To filter values that matches the input text
   * @param {string} value Input text
   */
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
