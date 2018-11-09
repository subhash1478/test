import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { AuthGuardService } from '../auth/auth-guard.service';
const routes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    {path: '', redirectTo: 'result'},
    {
    path: 'result',
    loadChildren: '../result/result.module#ResultModule',
    canActivate: [AuthGuardService]
    },
    {
      path: 'add-question',
      loadChildren: '../dashboard/dashboard.module#DashboardModule',
      canActivate: [AuthGuardService]
    },
    {
      path: 'question-listing',
      loadChildren: '../questionlisting/questionlisting.module#QuestionlistingModule',
      canActivate: [AuthGuardService]
    },
    {
      path: 'candidate',
      loadChildren: '../candidate/candidate.module#CandidateModule',
      canActivate: [AuthGuardService]
    },
    {
      path: 'candidate/listing',
      loadChildren: '../candidate/candidate.module#CandidateModule',
      canActivate: [AuthGuardService]
    },
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
