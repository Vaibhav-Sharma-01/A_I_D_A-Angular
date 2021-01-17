// Core modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

// AIDA services
import { ToastMessage } from '@shared/services/toast-message';
import { RegistriesService } from '@features/registries/service/registries.service';

// Utils
import { Messages } from '@utils/data/message';
import { Countries } from '@utils/data/countries';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
})
export class TenantComponent implements OnInit {
  companyLogo: File;
  contactId: any;
  countries: Array<any>;
  editMode: boolean;
  isLoading: boolean = false;
  isNew: boolean = false;
  messages: any;
  tenantForm: FormGroup;
  tenantId: any;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registriesApis: RegistriesService,
    private route: ActivatedRoute,
    private toast: ToastMessage
  ) {}

  allModules = [
    { name: 'Opportunities', id: '2' },
    { name: 'Human Resource', id: '3' },
    { name: 'Lists', id: '4' },
    { name: 'Orders', id: '5' },
    { name: 'HelpDesk', id: '6' },
    { name: 'Website', id: '7' },
    { name: 'Drive', id: '10' },
    { name: 'Registries', id: '1' },
    { name: 'Dashboard', id: '8' },
    { name: 'Settings', id: '9' },
  ];

  availableModules = [
    { name: 'Opportunities', id: '2' },
    { name: 'Human Resource', id: '3' },
    { name: 'Lists', id: '4' },
    { name: 'Orders', id: '5' },
    { name: 'HelpDesk', id: '6' },
    { name: 'Website', id: '7' },
    { name: 'Drive', id: '10' },
  ];

  tenantModuleAccess = [
    { name: 'Registries', id: '1' },
    { name: 'Dashboard', id: '8' },
    { name: 'Settings', id: '9' },
  ];

  /**
   * Angular Life cycle Hook
   */
  ngOnInit(): void {
    this.tenantId = this.route.snapshot.params.id;
    this.inItData()
    this.messages = Messages.en.tenant;
    this.initTenantForm();
    if (this.tenantId != 'create') {
      this.getTenant();
      this.editMode = true;
    }
  }

  /**
   * Is form valid
   */
  isFormValid(): boolean {
    return this.tenantForm.valid;
  }

  /**
   * Is form dirty
   */
  isFormDirty(): boolean {
    return this.tenantForm.dirty;
  }

  /**
   * To make the form Pristine
   */
  makeFormPristine(): void {
    return this.tenantForm.markAsPristine();
  }

  /**
   * Initialize Country Data
   */
  inItData(): void {
    this.countries = Countries;
  }

  /**
   * Initialize tenant form
   */
  initTenantForm(): void {
    this.tenantForm = this.fb.group({
      name: ['', Validators.required],
      vatNumber: ['', Validators.required],
      fiscalCode: ['', Validators.required],
      sdiCode: ['', Validators.required],
      reaCode: [''],
      phoneNumber: [''],
      email: [''],
      pec: [''],
      address: [''],
      postalCode: [''],
      city: [''],
      province: [''],
      country: [''],
      access: [],
      userForm: this.fb.group({
        name: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        userName: ['', Validators.required],
        role: ['admin'],
        passwordConfirm: [''],
        permissions: [],
        status: ['active'],
      }),
      subDomain: [''],
    });
  }

  /**
   * Create tenant
   */
  createTenant(): void {
    let permissionArray: any[] = [];
    this.tenantModuleAccess.map((el: any) => {
      permissionArray.push(el.name);
    });
    this.tenantForm.patchValue({
      access: permissionArray,
    });
    this.tenantForm.controls.userForm.patchValue({
      passwordConfirm: this.tenantForm.value.userForm.password,
      permissions: permissionArray,
    });
    if (this.tenantForm.valid) {
      this.isLoading = true;
      this.registriesApis
        .createTenantAndAdminUser(this.tenantForm.value)
        .subscribe(
          (res: any) => {
            if (res.companyId && this.companyLogo) {
              const fd = new FormData();
              fd.append('companyLogo', this.companyLogo);
              this.registriesApis
                .updateCompanyLogo(res.companyId, fd)
                .subscribe(
                  (res: any) => {
                    this.isLoading = false;
                    this.toast.open(this.messages.success.added, 'close');
                  },
                  (err: any) => {
                    this.toast.open(this.messages.error.unableTOAdd, 'error');
                    this.isLoading = false;
                  }
                );
            } else {
              this.toast.open(this.messages.success.added, 'close');
              this.isLoading = false;
            }
          },
          (err: any) => {
            this.isLoading = false;
            this.toast.open(this.messages.unableToAdd, 'error');
          }
        );
    } else {
      this.toast.open('Form Invalid', 'error');
    }
  }

  /**
   * Drop Event
   */
  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /**
   * Get Tenant
   */
  getTenant(): void {
    this.registriesApis.getTenantById(this.tenantId).subscribe(
      (res: any) => {
        
        this.tenantModuleAccess = [];
        this.availableModules = [];
        this.allModules.map((el) => {
          if (res.data.access.includes(el.name)) {
            this.tenantModuleAccess.push(el);
          } else {
            this.availableModules.push(el);
          }
        });
        this.contactId = res.data.businessId._id;
        this.tenantForm.patchValue({
          name: res.data.businessId.name,
          vatNumber: res.data.businessId.vatNumber,
          fiscalCode: res.data.businessId.fiscalCode,
          sdiCode: res.data.businessId.sdiCode,
          reaCode: res.data.businessId.reaCode,
          phoneNumber: res.data.businessId.phoneNumber,
          email: res.data.businessId.email,
          pec: res.data.businessId.pec,
          address: res.data.businessId.address,
          postalCode: res.data.businessId.postalCode,
          city: res.data.businessId.city,
          province: res.data.businessId.province,
          country: res.data.businessId.country,
          access: res.data.access,
          subDomain: res.data.subDomain,
        });
      },
      (err: any) => {
        this.toast.open(this.messages.error.unableToGet,'error');
      }
    );
  }

  /**
   * Update Tenant
   */
  updateTenant(): void {
    delete this.tenantForm.value.userForm;
    let permissionArray: any[] = [];
    this.tenantModuleAccess.map((el: any) => {
      permissionArray.push(el.name);
    });
    this.tenantForm.patchValue({
      access: permissionArray,
    });
    this.isLoading = true;
    this.registriesApis
      .updateCompany(this.contactId, this.tenantForm.value)
      .subscribe(
        (res: any) => {
          this.registriesApis
            .updateTenant(this.tenantId, this.tenantForm.value)
            .subscribe(
              (res: any) => {
                this.registriesApis
                  .updateTenantAdminPermission(this.tenantId, {
                    permissions: permissionArray,
                  })
                  .subscribe(
                    (res: any) => {
                      this.toast.open(this.messages.success.updated, 'close');
                    },
                    (err: any) => {
                      this.toast.open(
                        this.messages.error.unableToUpdate,
                        'close'
                      );
                    }
                  );
                if (this.companyLogo) {
                  const fd = new FormData();
                  fd.append('companyLogo', this.companyLogo);

                  this.registriesApis
                    .updateCompanyLogo(res.companyId, fd)
                    .subscribe(
                      (res: any) => {
                        this.isLoading = false;
                        this.toast.open(this.messages.success.updated, 'close');
                        
                      },
                      (err: any) => {
                        this.toast.open(
                          this.messages.error.unableToUpdate,
                          'error'
                        );
                        this.isLoading = false;
                      }
                    );
                } else {
                  this.isLoading = false;
                  this.toast.open(this.messages.success.updated, 'close');
                }
              },
              (err: any) => {
                this.isLoading = false;
                this.toast.open(this.messages.error.unableToUpdate, 'error');
              }
            );
        },
        (err: any) => {
          this.isLoading = false;
          this.toast.open(this.messages.unableToUpdate, 'error');
        }
      );
  }

  /**
   *
   * @param {Event} e Angular Event
   */
  companyLogoUpload(e: any): void {
    if (e.target.files[0].type.match('image')) {
      this.companyLogo = <File>e.target.files[0];
    } else {
      // this.openSnackBar('Please upload a image type file','close');
    }
  }
}
