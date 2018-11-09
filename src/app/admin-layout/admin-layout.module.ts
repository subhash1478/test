import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    AdminLayoutRoutingModule, MaterialModule
  ],
  declarations: [AdminLayoutComponent, SidemenuComponent],
  exports: [SidemenuComponent]
})
export class AdminLayoutModule { }
