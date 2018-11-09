import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { LoginRoutingModule } from './login-routing.module';
 import { ReactiveFormsModule } from '@angular/forms';

  import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { WebservicesService } from '../services/webservices.service';
import { LoginpageComponent } from './loginpage.component';
  @NgModule({
  imports: [
    CommonModule,MaterialModule,ReactiveFormsModule,
    LoginRoutingModule,FormsModule,
 
  ],
  providers:[WebservicesService],
  declarations: [LoginpageComponent]
})
export class LoginModule { }
