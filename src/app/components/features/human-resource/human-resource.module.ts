import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanResourceRoutingModule } from './human-resource-routing.module';
import { HumanResourceComponent } from './human-resource.component';


@NgModule({
  declarations: [HumanResourceComponent],
  imports: [
    CommonModule,
    HumanResourceRoutingModule
  ]
})
export class HumanResourceModule { }
