import { MailComponent } from './eager-general/mail/mail.component';
import { CallComponent } from './eager-general/call/call.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Auth components
import { MainBodyComponent } from './components/features/main-body/main-body.component';

// AIDA Module
import { AuthGuardService as AuthGuard } from './components/authentication/auth-guard.service';
import { LoginGuardService as LoginGuard } from './components/authentication/login-guard.service';

const routes: Routes = [
  {
    path: 'general',
    children: [
      {
        path: 'call',
        component: CallComponent
      },
      {
        path: 'mail',
        component: MailComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainBodyComponent,
    children: [
      {
        path: 'dashboard',
        data: { breadcrumb: 'dashboard', path: '/dashboard' },
        loadChildren: () =>
          import('./components/features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'registries',

        loadChildren: () =>
          import('./components/features/registries/registries.module').then(
            (m) => m.RegistriesModule
          ),
        data: { breadcrumb: 'registries', path: '/registries' },
      },
      {
        path: 'opportunity',
        data: { breadcrumb: 'opportunity', path: '/opportunity' },
        loadChildren: () =>
          import('./components/features/opportunity/opportunity.module').then(
            (m) => m.OpportunityModule
          ),
      },
      {
        path: 'human-resource',
        data: { breadcrumb: 'human-resource', path: '/human-resource' },
        loadChildren: () =>
          import(
            './components/features/human-resource/human-resource.module'
          ).then((m) => m.HumanResourceModule),
      },
      {
        path: 'lists',
        data: { breadcrumb: 'lists', path: '/lists' },
        loadChildren: () =>
          import('./components/features/lists/lists.module').then(
            (m) => m.ListsModule
          ),
      },
      {
        path: 'projects',
        data: { breadcrumb: 'projects', path: '/projects' },
        loadChildren: () =>
          import('./components/features/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
      {
        path: 'help',
        data: { breadcrumb: 'help' },
        loadChildren: () =>
          import('./components/features/help/help.module').then(
            (m) => m.HelpModule
          ),
      },
      {
        path: 'time-tracking',
        data: { breadcrumb: 'time-tracking', path: '/time-tracking' },
        loadChildren: () =>
          import(
            './components/features/time-tracking/time-tracking.module'
          ).then((m) => m.TimeTrackingModule),
      },
      {
        path: 'website',
        data: { breadcrumb: 'website' , path: '/website' },
        loadChildren: () =>
          import('./components/features/website/website.module').then(
            (m) => m.WebsiteModule
          ),
      },
      {
        path: 'drive',
        data: { breadcrumb: 'drive', path: 'drive' },
        loadChildren: () =>
          import('./components/features/drive/drive.module').then(
            (m) => m.DriveModule
          ),
      },
    ],
  },
  // { path: 'widgets-shared', loadChildren: () => import('./components/common/widgets-shared/widgets-shared.module').then(m => m.WidgetsSharedModule) },
  // { path: 'general-shared', loadChildren: () => import('./components/common/general-shared/general-shared.module').then(m => m.GeneralSharedModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
