import { CallComponent } from './call/call.component';
// Core Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{
  path: 'call',
  component: CallComponent
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EagerGeneralRoutingModule {}