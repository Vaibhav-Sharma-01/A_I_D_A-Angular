import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WidgetsSharedComponent } from './widgets-shared.component';

const routes: Routes = [{ path: '', component: WidgetsSharedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsSharedRoutingModule { }
