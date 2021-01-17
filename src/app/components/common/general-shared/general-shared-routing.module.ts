import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralSharedComponent } from './general-shared.component';

const routes: Routes = [{ path: '', component: GeneralSharedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralSharedRoutingModule { }
