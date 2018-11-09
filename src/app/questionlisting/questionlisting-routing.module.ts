import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionlistingComponent } from './questionlisting.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: QuestionlistingComponent,
  canActivate:[AuthGuardService]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionlistingRoutingModule { }
