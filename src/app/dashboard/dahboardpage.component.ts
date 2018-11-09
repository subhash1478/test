import { Component, ViewChild } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/data.service';
import { WebservicesService } from '../services/webservices.service';
import { fadeAnimation } from '../animations';
@Component({
  selector: 'app-dahboardpage',
  templateUrl: './dahboardpage.component.html',
  styleUrls: ['./dahboardpage.component.css'],
  animations: [fadeAnimation]
})
export class DahboardpageComponent {
  @ViewChild('textEditor')

  name: string;
  ourFile: File; // hold our file
  answerlist: any = [{answer: ''}];
  correct: any;
  quiz: any = {};
  options: any = {lineWrapping: true, toolbar: false};
  showForm: boolean;
  SelectedColor: string;
  colors: string[];
  categoryList: any = [];
  param1: string;
  edit: boolean;
  image: any;
  url: any;
  selectedFile: any;

  constructor(private _services: WebservicesService, private router: Router, public msg: DataService, private route: ActivatedRoute
  ) {
    this.name = '';
    this.route.queryParams.subscribe(params => {
      this.param1 = params['id'];
      if (this.param1 === undefined) {
        this.edit = false;
      } else {
        this.edit = true;
        this.getQuestion();
      }
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.getCategory();
  }
  getCategory() {
    this._services.getCategory().subscribe(
      (response: any) => {
        const result: any = response.response.data;
        this.categoryList = result;
      },
      error => {}
    );
  }
  addAnswer() {
    this.answerlist.push({ answer: '' });
  }
  removeAnswer(i) {
    this.answerlist.splice(i, 1);
  }
  getQuestion() {
    const obj = {
      id: this.param1
    };
    this._services.getQuestion(obj).subscribe((response: any) => {
      const result: any = response.response.data;
      this.quiz = result;
      this.answerlist = result.answer;
      this.url = result.image;
    });
  }
  openInput() {
    // your can use ElementRef for this later
    document.getElementById('fileInput').click();
  }
  fileChange(files: File[]) {
    if (files.length > 0) {
      this.ourFile = files[0];
    }
  }
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.ourFile = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = event => {
        // called once readAsDataURL is completed
        //  this.url = event.target.result;
      };
    }
  }
  /**
   * this is used to perform the actual upload
   */
  upload() {
    this.image = document.getElementById('fileInput');
  }
  addQuestion() {
    if (!this.quiz.skill) {
      this.msg.openSnackBar('Please select skill');
      return false;
    }
    if (!this.quiz.level) {
      this.msg.openSnackBar('Please select level');
      return false;
    }
    if (!this.quiz.question) {
      this.msg.openSnackBar('Please enter question');
      return false;
    }
    this.answerlist.forEach(element => {
      if (element.answer === '') {
        this.msg.openSnackBar('Please enter some answer');
        return false;
      }
    });
    this.quiz.answer = this.answerlist;
    this.quiz.status = 1;
    const cond = this.edit ? 'update' : 'add';
    // const uploadData = new FormData();
    // if (this.ourFile) {
    //   uploadData.append('question_file', this.ourFile, this.ourFile.name);
    //   this.quiz.image_available = true;
    // } else {
    //   this.quiz.image_available = false;
    // }
    // uploadData.append('param', JSON.stringify(this.quiz));
    this._services.addQuestion(this.quiz, cond).subscribe(response => {
      this.quiz = [];
      this.showForm = true;
    });
  }
  clearCache() {
    this._services.clearCache();
  }
  goToListing() {
    this.router.navigate(['/question-listing']);
  }

  addImage(event) {
    const item = {
      id: this.param1
    };
    const uploadData = new FormData();
    this.selectedFile = event.target.files;
    for (let i = 0; i < this.selectedFile.length; i++) {
      uploadData.append(
        'question_file',
        this.selectedFile[i],
        this.selectedFile[i]['name']
      );
    }
    uploadData.append('param', JSON.stringify(item));


    this._services.uploadQuestionImage(uploadData).subscribe(
      (Response: any) => {
      },
      Error => {}
    );
  }
}
