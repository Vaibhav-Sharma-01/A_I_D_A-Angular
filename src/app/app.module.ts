import { EagerGeneralModule } from './eager-general/eager-general.module';
// Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './utils/httpInterceptor.interceptor';

// 3rd Party Modules
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';

// Components
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { MainBodyComponent } from './components/features/main-body/main-body.component';
import { BreadcrumbsComponent } from './components/common/breadcrumbs/breadcrumbs.component';
import { SubHeaderMenuComponent } from './components/common/sub-header-menu/sub-header-menu.component';
import { QuickMenuComponent } from './components/common/header/quick-menu/quick-menu.component';
import { HelpComponent } from './components/common/header/help/help.component';

// AIDA Module
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainBodyComponent,
    BreadcrumbsComponent,
    SubHeaderMenuComponent,
    QuickMenuComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EagerGeneralModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
            return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
    }
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
