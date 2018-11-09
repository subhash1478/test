import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateComponent } from './candidate.component';
import { CandidateListingComponent } from './candidate-listing/candidate-listing.component';
const routes: Routes = [{
  path: '',
  component: CandidateComponent,
},
{
  path: 'listing',
  component: CandidateListingComponent,
  data: {
    title: 'Candidate Listing '
  }
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
