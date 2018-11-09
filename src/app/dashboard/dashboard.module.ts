import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxWigModule} from 'ngx-wig';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
 import { ShareModule } from '../share/share.module';

import { ReactiveFormsModule } from '@angular/forms';
import { DahboardpageComponent } from './dahboardpage.component';


@NgModule({
  imports: [ ShareModule,NgxWigModule,
    CommonModule, MaterialModule, FormsModule, ReactiveFormsModule,
    DashboardRoutingModule
  ],
  declarations: [DahboardpageComponent],
 })
export class DashboardModule { }
