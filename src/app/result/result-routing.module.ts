import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultComponent } from './result.component';
import { AuthGuardService } from '../auth/auth-guard.service';
const routes: Routes = [{
  path: '', 
  component: ResultComponent , 
  canActivate:[AuthGuardService],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
