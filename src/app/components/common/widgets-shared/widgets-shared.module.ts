// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AIDA Modules
import { WidgetsSharedRoutingModule } from './widgets-shared-routing.module';
import { SharedModule } from '@shared/shared.module';

// AIDA Components
import { WidgetsSharedComponent } from './widgets-shared.component';
import { AddWidgetsDialogComponent } from './add-widgets-dialog/add-widgets-dialog.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { AssociatedContactComponent } from './associated-contact/associated-contact.component';
import { RelatedCompaniesComponent } from './related-companies/related-companies.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    WidgetsSharedComponent, 
    AddWidgetsDialogComponent, 
    AttachmentsComponent, 
    AssociatedContactComponent, 
    RelatedCompaniesComponent
  ],
  imports: [
    CommonModule,
    WidgetsSharedRoutingModule,
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
  exports: [
    AssociatedContactComponent,
    AttachmentsComponent,
    AddWidgetsDialogComponent,
    RelatedCompaniesComponent,
  ]
})
export class WidgetsSharedModule { }
