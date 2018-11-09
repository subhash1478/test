import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructionRoutingModule } from './instruction-routing.module';
import { InstructionComponent } from './instruction.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule,
    CommonModule,MaterialModule,
    InstructionRoutingModule
  ],
  declarations: [InstructionComponent],
 })
export class InstructionModule { }
