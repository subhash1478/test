import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebservicesService } from '../services/webservices.service';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizRoutingModule } from './quiz-routing.module';
import { MaterialModule } from '../material.module';
import { QuizComponent } from './quiz.component';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CountdownModule,
    CommonModule, MaterialModule,
     QuizRoutingModule
  ],
  declarations: [QuizComponent],
  providers: [WebservicesService]
})

export class QuizModule {


}
