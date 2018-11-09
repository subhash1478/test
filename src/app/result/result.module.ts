import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { MaterialModule } from '../material.module';
 import { FormsModule } from '@angular/forms';
import { WebservicesService } from '../services/webservices.service';
 import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [MaterialModule, FormsModule, ShareModule,
    CommonModule,NgxChartsModule,

    ResultRoutingModule
  ],
  declarations: [ResultComponent],
  providers: [WebservicesService]
})
export class ResultModule { }
