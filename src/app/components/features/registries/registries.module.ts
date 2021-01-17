// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// AIDA Modules
import { RegistriesRoutingModule } from './registries-routing.module';
import { SharedModule } from '@shared/shared.module';
import { WidgetsSharedModule } from './../../common/widgets-shared/widgets-shared.module';

// 3rd Party Modules
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// Components
import { RegistriesComponent } from './registries.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './companies/company/company.component';
import { InformationComponent } from './companies/company/information/information.component';
import { TabsComponent } from './companies/company/tabs/tabs.component';
import { WidgetsComponent } from './companies/company/widgets/widgets.component';
import { AddCompanyComponent } from './companies/add-company/add-company.component';
import { ActivitiesComponent } from './companies/company/tabs/activities/activities.component';
import { EmailsComponent } from './companies/company/tabs/emails/emails.component';
import { PhoneComponent } from './companies/company/tabs/phone/phone.component';
import { NotesComponent } from './companies/company/tabs/notes/notes.component';
import { TasksComponent } from './companies/company/tabs/tasks/tasks.component';
import { MeetingComponent } from './companies/company/tabs/meeting/meeting.component';
import { TenantsComponent } from './tenants/tenants.component';
import { ContactComponent } from './contact/contact.component';
import { AddContactComponent } from './contact/add-contact/add-contact.component';
import { ProfileComponent } from './contact/contacts/profile/profile.component';
import { ContactsComponent } from './contact/contacts/contacts.component';
import { TenantComponent } from './tenants/tenant/tenant.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    RegistriesComponent,
    CompaniesComponent,
    CompanyComponent,
    InformationComponent,
    TabsComponent,
    WidgetsComponent,
    AddCompanyComponent,
    ActivitiesComponent,
    EmailsComponent,
    PhoneComponent,
    NotesComponent,
    TasksComponent,
    MeetingComponent,
    TenantsComponent,
    ContactComponent,
    AddContactComponent,
    ProfileComponent,
    ContactsComponent,
    TenantComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RegistriesRoutingModule,
    ReactiveFormsModule,
    WidgetsSharedModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
            return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
    }
    })
  ],
})
export class RegistriesModule {}
