// Angular Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../components/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AIDA Modules
import { EagerGeneralRoutingModule } from './eager-general-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// AIDA Components
import { CallComponent } from './call/call.component';
import { MailComponent } from './mail/mail.component';



@NgModule({
  declarations: [CallComponent, MailComponent],
  imports: [
    CommonModule,
    EagerGeneralRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  exports: [
    CallComponent,
    MailComponent
  ]
})
export class EagerGeneralModule { }
