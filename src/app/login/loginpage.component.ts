import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebservicesService } from '../services/webservices.service';
import { DataService } from 'src/data.service';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  message: string;
  form: FormGroup;
  private formSubmitAttempt: boolean;
  constructor( private data: DataService,
      private router: Router,
      private _services: WebservicesService,
      private fb: FormBuilder,
    ) {}
    isFieldInvalid(field: string) {
      return (
        (!this.form.get(field).valid && this.form.get(field).touched) ||
        (this.form.get(field).untouched && this.formSubmitAttempt)
        );
      }
      ngOnInit() {
        this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
        });
        this.data.currentMessage.subscribe(message => this.message = message);
      }
      onSubmit() {
        if (this.form.valid) {
          this._services.doLogin(this.form.value).subscribe((Response: any) => {
            const result = Response.response.data;
            localStorage.setItem('token', result.token);
            this.data.changeMessage('lodaer');
            this.router.navigate(['/candidate/listing']);

          }, (error) => {
          });
        }
      }
    }
    