import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DahboardpageComponent } from './dahboardpage.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DahboardpageComponent,
    canLoad:[AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
