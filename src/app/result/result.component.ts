import { Component, AfterViewInit
} from '@angular/core';
import { WebservicesService } from '../services/webservices.service';
 import {single} from './data';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements AfterViewInit {
  candidatelist: any = [];
  candidate: number;
  examList: any = [];
  categoryList: any = [];
  color = 'primary';
  view: any[] = [500, 200];

  mode = 'determinate';
  value: number;
  counter = Array;
  //
  // ──────────────────────────────────────── I ──────────
  //   :::::: : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────
  //
  single: any[];
  multi: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // line, area
  autoScale = true;
  correctAnswer: number;
  wrongAnswer: number;
  assignExam: boolean;
  resultData: any = [];
  skillData: any[];
  skillDatavalue: any[];
  total_question: number;
  totalScore: number;
  percenatge: any;
  exam_finished: any;
  constructor(public _services: WebservicesService, public msg: DataService) {
    Object.assign(this, {single});
  }
  numberReturn(length) {
    return new Array(length);
  }
  ngAfterViewInit() {
    this._services.getCandidatelisting().subscribe((response: any) => {
      const result = response.response.data;
      this.candidatelist = result;
    });
    this.getCounter();
  }
  //
  // ────────────────────────────────────────────────────────────── I ──────────
  //   :::::: G E T  C A T E G O R Y : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────
  //
  getCategory() {
    this._services.getCategory().subscribe((response: any) => {
      const result: any = response.response.data;
      const cat = [];
      result.forEach(element => {
        const object = Object.assign({});
        object.checked = false;
        object.easy = element.easy;
        object.easy_selected = element.easy_selected;
        object.medium = element.medium;
        object.medium_selected = element.medium_selected;
        object.difficulty = element.difficulty;
        object.difficulty_selected = element.difficulty_selected;
        object.title = element.title;
        object.id = element.id;
        cat.push(object);
      });
      this.categoryList = cat;
    }, (error) => {
    });
  }
  //
  // ────────────────────────────────────────────────────────── I ──────────
  //   :::::: G E T R E S U L T : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  //
  getResult() {
    this.assignExam = true;
    this._services.getResult(this.candidate).subscribe((response: any) => {
      const result = response.response.data;
      this.resultData = result;
      const examcode = [];
      result.forEach(element => {
        const object =   Object.assign({});
        if (examcode.findIndex(i => i.examination_code === element.examination_code) === -1) {
          object.createdAt = element.createdAt;
          object.examination_code = element.examination_code;
          object.exam_over = element.exam_over;
          object.exam_finished = element.exam_finished;
          examcode.push(object);
        }
      });


      examcode.sort((a, b): any => {
        const date1 = new Date(a.createdAt);
        const date2 = new Date(b.createdAt);
        return date2.getTime() -  date1.getTime();

      });

      this.examList = examcode;
    }, (error) => {
      this.examList = [];
      this.msg.openSnackBar(error.response.message);
    });
  }
  //
  // ──────────────────────────────────────────────────────── I ──────────
  //   :::::: G E T S C O R E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────
  //
  getScore(item) {

    this.single = [];
    this.totalScore = 0;
    this.total_question = 0;
    this.percenatge = 0;

    this._services.getCandidateScore(item).subscribe((response: any) => {

      const result = response.response.data.skillscore;
      const exam = response.response.data.exam;

      exam.forEach(element => {

        this.totalScore += element.score;
        this.total_question += element.total_question;


 if (item.skill_id.id === element.skill_id) {
this.exam_finished = element.exam_finished;




 }
      });
      this.percenatge = (((100 / this.total_question) * this.totalScore).toFixed(2));



      this.correctAnswer = 0;
      this.wrongAnswer = 0;
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        if (element.submitted_answer === element.question.correct_answer) {
          this.correctAnswer  += 1;
        } else {
          this.wrongAnswer  += 1;
        }
      }
      this.single = [
        {
          'name': 'correct answer',
          'value': this.correctAnswer
        },
        {
          'name': 'Wrong answer',
          'value': this.wrongAnswer
        },
      ];
    });
  }


  generateExamCode() {
    const obj = {
      candidate_id: this.candidate,
      category: this.categoryList
    };
    let flag = 0;
    this.categoryList.forEach(element => {
       const calc = element.difficulty_selected + element.medium_selected + element.easy_selected;
      if ((element.checked === true)   && calc < 1 ) {
        flag = 0;
      }
      if ((element.checked === true)   && calc > 0 ) {
        flag = 1;
      }
    });

     if (flag === 1) {
      this._services.generateExamCode(obj).subscribe((response: any) => {
        const result = response.response;
        this.msg.openSnackBar(result.message);
        this.getResult();
        this.categoryList = [];
      });
    } else {
      this.msg.openSnackBar('Please select skill and number of question candidate should attend');
    }
  }
  getCounter() {
  }
  copy () {
  }
  deletExam() {
  }
  getSkill(item) {

    this.skillDatavalue = this.resultData.filter(element => {
      if (element.examination_code === item.examination_code) {
        return element.skill_id;
      }
    });
    this.getScore(this.skillDatavalue[0]);
  }
  onSelect(event) {
    const i = this.skillDatavalue[event.index];
    this.getScore(i);
  }
  copyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.msg.openSnackBar('Copied');
  }

}
