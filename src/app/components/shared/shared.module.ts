// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material Modules
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';

// Services
import { GetLoggedUserService } from './services/get-logged-user.service';
import { ToastMessage } from './services/toast-message';

// 3rd Party modules
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

// Components
import { LoaderComponent } from './components/loader/loader.component';
import { AidaLoaderComponent } from './components/aida-loader/aida-loader.component';
import { SideSlideComponent } from './components/side-slide/side-slide.component';
import { GeneralPhoneComponent } from './components/general/general-phone/general-phone.component';
import { GeneralEmailComponent } from './components/general/general-email/general-email.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const materialModules = [
  DragDropModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatNativeDateModule,
];

@NgModule({
  declarations: [
    AidaLoaderComponent,
    LoaderComponent, 
    SideSlideComponent, 
    GeneralPhoneComponent, 
    GeneralEmailComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxMatSelectSearchModule,
    Ng2SearchPipeModule,
    ...materialModules
  ],
  exports: [
    AidaLoaderComponent,
    LoaderComponent,
    SideSlideComponent,
    GeneralPhoneComponent, 
    GeneralEmailComponent,
    DeleteDialogComponent,
    NgxMatSelectSearchModule,
    Ng2SearchPipeModule,
    ...materialModules
  ],
  providers: [
    GetLoggedUserService,
    ToastMessage
  ]
})
export class SharedModule { }
