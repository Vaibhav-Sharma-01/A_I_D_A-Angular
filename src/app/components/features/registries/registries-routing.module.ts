import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistriesComponent } from './registries.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './companies/company/company.component';
import { ContactsComponent } from './contact/contacts/contacts.component';
import { TenantsComponent } from './tenants/tenants.component'; 
import { TenantComponent } from './tenants/tenant/tenant.component';

const routes: Routes = [
  {
    path: '',
    component: RegistriesComponent,
    children: [
      {
        path: 'companies',
        component: CompaniesComponent,
      },
      {
        path: 'contacts',
        component: ContactComponent,
      },
      {
        path: 'tenants',
        component: TenantsComponent
      },
      {
        path: 'tenant/:id',
        component: TenantComponent
      },
      {
        path: 'user',
        component: UserProfileComponent
      },
      
    ]
  },
  {
    path: 'company/:id',
    component: CompanyComponent
  },
  {
    path: 'contact/:id',
    component: ContactsComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistriesRoutingModule { }
