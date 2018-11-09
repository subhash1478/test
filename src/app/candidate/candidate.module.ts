import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateComponent } from './candidate.component';
import { ShareModule } from '../share/share.module';
import { MaterialModule } from '../material.module';
 import{FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidateListingComponent, DialogDataExampleDialog } from './candidate-listing/candidate-listing.component';

@NgModule({
  imports: [
    CommonModule, ShareModule, MaterialModule,
    CandidateRoutingModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [
    CandidateComponent,
    CandidateListingComponent,
    DialogDataExampleDialog,
    CandidateListingComponent
  ],
  entryComponents: [
    DialogDataExampleDialog
  ],
  providers:[CandidateListingComponent]

})
export class CandidateModule { }

