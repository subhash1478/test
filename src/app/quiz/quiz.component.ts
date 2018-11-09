import { Component, OnInit, ElementRef, Renderer, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebservicesService } from '../services/webservices.service';
import {MatSnackBar} from '@angular/material';
import { DataService } from '../../data.service';
import { Config } from '../config';
import 'rxjs/Rx'; 
import { fromEvent } from 'rxjs';
 @Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  form: FormGroup;
  showloader = 'indeterminate';
  hideloader = 'determinate';
  loader: string;
  hide_examination_code = true;
  formSubmitAttempt: boolean;
  questionList: any = [];
  skillLIst: any = [];
  totalTime: { leftTime: number; };
  exam_finished: string;
  constructor( public snackBar: MatSnackBar,  public data: DataService, private router: Router, private _services: WebservicesService,
    private fb: FormBuilder, elementRef: ElementRef, renderer: Renderer,
    ) {
      // Listen to click events in the component
      renderer.listen(elementRef.nativeElement, 'blur', (event) => {
        // Do something with 'event'
      });
    }
    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: I S F I E L D I N V A L I D : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //
    isFieldInvalid(field: string) {
      return (
        (!this.form.get(field).valid && this.form.get(field).touched) ||
        (this.form.get(field).untouched && this.formSubmitAttempt)
        );
      }
      ngOnInit() {
        localStorage.clear();
        this.form = this.fb.group({
          examination_code: ['', Validators.required]
        });
        window.addEventListener('blur', this.blur, false);
        this.form.valueChanges
        .filter(data => this.form.valid)
        const el = document.getElementById('my-element');
         const mouseMoves = fromEvent(el, 'mousemove');
         const subscription = mouseMoves.subscribe((evt: MouseEvent) => {
         
          if (evt.clientX < 40 && evt.clientY < 40) {
            subscription.unsubscribe();
          }
        });
      }
      blur = (event) => {  
        this.exam_finished = 'tab_change';
        this.submitExamAnswer();
      }
      ngOnDestroy() {
        window.removeEventListener('blur', this.blur, false);
      }
      //
      // ──────────────────────────────────────────────────────── I ──────────
      //   :::::: O N S U B M I T : :  :   :    :     :        :          :
      // ──────────────────────────────────────────────────────────────────
      //
      onSubmit() {
        this.loader = this.showloader;
        if (this.form.valid) {
          this._services.verifyExamCode(this.form.value).subscribe((Response: any) => {
            this.loader = this.hideloader;
            const result = Response.response.data;
            localStorage.setItem('token', result.token);
            this.hide_examination_code = false;
            this.skillLIst = result.data;
          }, (error) => {
            this.hide_examination_code = true;
            this.loader = this.hideloader;
            const msg = error.response.message;
            this.openSnackBar(msg);
          });
        } else {
          this.loader = this.hideloader;
          const msg = 'Enter Examination code';
          this.openSnackBar(msg);
        }
      }
      //
      // ────────────────────────────────────────────────────────────────────────────── I ──────────
      //   :::::: S H O W Q U E S T I O N S T E E P E R : :  :   :    :     :        :          :
      // ────────────────────────────────────────────────────────────────────────────────────────
      //
      showQuestionBack(i) {
        const c = i - 1;
        this.questionList[i].show = true;
        this.questionList[c].show = false;
      }
      showQuestionForward(i) {
        this.loader = 'determinate';
        if (i !== 0) {
          const c = i - 1;
          //    this.questionList[c].show = true;
          if (this.questionList[c].submitted_answer === undefined) {
            const msg = 'Please enter your choice';
            this.openSnackBar(msg);
            return false;
          } else {
            this.questionList[c].show = true;
          }
         }
        if (this.questionList.length !== i) {
          this.questionList[i].show = false;
        }
        if ( this.questionList.length === i) {
          this.exam_finished = 'manually';
          this.submitExamAnswer();
        }
      }
      //
      // ──────────────────────────────────────────────────────────────── I ──────────
      //   :::::: O P E N S N A C K B A R : :  :   :    :     :        :          :
      // ──────────────────────────────────────────────────────────────────────────
      //
      openSnackBar(msg) {
        this.snackBar.open(msg, '', {
          duration: 3000
        });
      }
      //
      // ──────────────────────────────────────────────────────────────────────── I ──────────
      //   :::::: S U B M I T E X A M A N S W E R : :  :   :    :     :        :          :
      // ──────────────────────────────────────────────────────────────────────────────────
      //
      submitExamAnswer() {
        if ( this.questionList.length < 1) {
          return false;
        }
        this.loader = this.showloader;
        this.questionList.examination_code = this.form.value.examination_code;
        this._services.submitExam(this.questionList, this.exam_finished).subscribe((response) => {
          this.loader = this.hideloader;
          this.questionList = [];
          this.onSubmit();
          this.totalTime = {
            leftTime: 0
          };
        }, (error) => {
          this.loader = this.hideloader;
        });
      }
      //
      // ────────────────────────────────────────────────────────────── I ──────────
      //   :::::: G E T Q U E S T I O N : :  :   :    :     :        :          :
      // ────────────────────────────────────────────────────────────────────────
      //
      getQuestion(item) {
        this.loader = this.showloader;
        const object = {
          skill: item.skill_id.id,
          difficulty: item.level.difficulty_selected,
          easy: item.level.easy_selected,
          medium: item.level.medium_selected,
        };
        this._services.getQuizQuestionListing(object).subscribe((response: any) => {
          this.skillLIst = [];
          this.loader = this.hideloader;
          const result = response.response.data;
          const question = [];
          result.forEach((element , index) => {
            if (element.easy) {
              const easy = element.easy;
              easy.forEach(data => {
                data.show = true;
                data.examination_code = this.form.value.examination_code;
                question.push(data);
              });
            }
            if (element.medium) {
              const medium = element.medium;
              medium.forEach(data => {
                data.show = true;
                data.examination_code = this.form.value.examination_code;
                question.push(data);
              });
            }
            if (element.difficulty) {
              const difficulty = element.difficulty;
              difficulty.forEach(data => {
                data.show = true;
                data.examination_code = this.form.value.examination_code;
                question.push(data);
              });
            }
          });
          const ques = [];
          question.forEach(element => {
            // tslint:disable-next-line:no-shadowed-variable
            const object = Object.assign({});
            object.answer = element.answer;
            object.createdAt = element.createdAt;
            object.examination_code = element.examination_code;
            object.id = element.id;
            object.image = (element.image !== '') ? `${Config.cv_endpoint}/images/${element.image}` : '';
            object.question = element.question;
            object.show = element.show;
            object.skill = element.skill;
            object.status = element.status;
            object.submitted_answer = element.submitted_answer;
            object.updatedAt = element.updatedAt;
            ques.push(object);
          });
          this.questionList = ques;
          this.totalTime = {
            leftTime: 60 * this.questionList.length
          };
          this.showQuestionForward(0);
        }, (error) => {
          this.loader = this.hideloader;
        });
      }
      onFinished() {
        this.exam_finished = 'time_over';
        this.submitExamAnswer();
        this.questionList = [];
      }
      onStart() {
      }
      onNotify() {
      }
    }
    