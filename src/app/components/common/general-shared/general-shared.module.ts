// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AIDA Modules
import { GeneralSharedRoutingModule } from './general-shared-routing.module';
import { SharedModule } from '@shared/shared.module';

// Components
import { GeneralSharedComponent } from './general-shared.component';
import { EmailComponent } from './email/email.component';
import { PhoneComponent } from './phone/phone.component';
import { NotesComponent } from './notes/notes.component';
import { MeetingComponent } from './meeting/meeting.component';


@NgModule({
  declarations: [GeneralSharedComponent, EmailComponent, PhoneComponent, NotesComponent, MeetingComponent],
  imports: [
    CommonModule,
    SharedModule,
    GeneralSharedRoutingModule
  ],
  exports: [
    EmailComponent,
    MeetingComponent,
    NotesComponent,
    PhoneComponent
  ]
})
export class GeneralSharedModule { }
