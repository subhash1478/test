import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuestionlistingRoutingModule } from './questionlisting-routing.module';
import { QuestionlistingComponent } from './questionlisting.component';
import { MaterialModule } from '../material.module';
import { ShareModule } from '../share/share.module';



@NgModule({
  imports: [FormsModule,
    CommonModule, MaterialModule, ShareModule,
    QuestionlistingRoutingModule
  ],
  declarations: [QuestionlistingComponent],
 })
export class QuestionlistingModule { }
