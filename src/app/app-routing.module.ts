import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
const routes: Routes = [

  {
path: '',
  loadChildren: './admin-layout/admin-layout.module#AdminLayoutModule',
canActivate: [AuthGuardService],
  },
  {
    path: 'exam',
    loadChildren: './instruction/instruction.module#InstructionModule',
  },
  {
    path: 'quiz',
    loadChildren: './quiz/quiz.module#QuizModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes,
    {initialNavigation: 'enabled'
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
