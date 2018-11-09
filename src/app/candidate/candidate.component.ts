import { DataService } from '../../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WebservicesService } from '../services/webservices.service';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  uploadResume = false;
  filedata: FormData;
  selectedFile: any;
  separatorKeysCodes = [ENTER, COMMA];
  form: FormGroup;
  private formSubmitAttempt: boolean;
  edit: boolean;
  param1: any;
  item: any = [];
  constructor( private data: DataService, private route: ActivatedRoute,     
    private router: Router, private _services: WebservicesService,
    private fb: FormBuilder,
    ) {
      this.route.queryParams.subscribe(params => {
        this.param1 = params['id'];
        if (this.param1 === undefined) {
          this.edit = false;
        } else {
          this.edit = true;
          this.getCandidate();
        }
      });
    }

    
    ngOnInit() {
      this.form = this.fb.group({
        candidate_name:
        ['', [Validators.maxLength(100), Validators.minLength(3), Validators.required]],
        phone: ['', [Validators.maxLength(10), Validators.minLength(10), Validators.required]],
        candidate_email: ['', [Validators.required, Validators.email]],
        experience: ['', Validators.required],
        education: ['', Validators.required],
        refrence: ['', Validators.nullValidator],
        address: ['', Validators.required],
        skill: this.fb.array([])
      });
    }
    isFieldInvalid(field: string) {
      return (
        (!this.form.get(field).valid && this.form.get(field).touched) ||
        (this.form.get(field).untouched && this.formSubmitAttempt)
        );
      }
      onSubmit() {

       const obj = {
         type: (this.edit) ? 'update' : 'add',
        id: this.param1
        };
        if (this.form.valid) {
          this._services.addCandidate(this.form.value, obj).subscribe((Response: any) => {
            const msg = 'Added succesfully';
            this.data.openSnackBar(msg);
            this.uploadResume = true;
            this.item = Response.response.data;
          }, (error) => {

         //   this.data.openSnackBar(error.response.message);

          });
        }
      }
      add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our requirement
        if ((value || '').trim()) {
          const skill = this.form.get('skill') as FormArray;
          skill.push(this.fb.control(value.trim()));
        }
        // Reset the input value
        if (input) {
          input.value = '';
        }
      }
      remove(index: number): void {
        const skill = this.form.get('skill') as FormArray;
        if (index >= 0) {
          skill.removeAt(index);
        }
      }
      getCandidate() {
        const obj = {
          id: this.param1
        };
        this._services.getCandidateById(obj).subscribe((response: any) => {
          const result: any = response.response.data[0];
          this.form.patchValue({
            candidate_name: result.candidate_name,
            phone: result.phone,
            candidate_email: result.candidate_email,
            experience: result.experience,
            education: result.education,
            refrence:  result.refrence,
            address:  result.address,
           });
          const skilled = result.skill;
          const skill = this.form.get('skill') as FormArray;
          skilled.forEach(element => {
            skill.push(this.fb.control(element.trim()));
          });
        });
      }
      goToCandidateListing() {
        this.router.navigate(['/candidate/listing']);
      }
      onFileChanged(event) {
        this.selectedFile = event.target.files[0];
      }
      addImage(event) {
        const uploadData = new FormData();
        this.selectedFile = event.target.files;
        for (let i = 0; i < this.selectedFile.length; i++) {
          uploadData.append('resume', this.selectedFile[i], this.selectedFile[i]['name']);
        }
        uploadData.append('param', JSON.stringify(this.item));
        this._services.uploadResumeImage(uploadData).subscribe((Response: any) => {
          if (Response.success === false) {
            this.data.openSnackBar(Response.message.message);
          } else {
            this.data.openSnackBar(Response.message);
            this.ngOnInit();
          }
        }, (Error) => {
        });
      }
    }
