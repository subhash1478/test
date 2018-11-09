import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Config} from '../config';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';
 @Injectable({
  providedIn: 'root'
})
export class WebservicesService {
   category: any;
  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      }
      // return an ErrorObservable with a user-facing error message+
      return  throwError(error.error);
    }
    doLogin(data) {
      return this.http.post(`${Config.api_endpoint}/login`, data)
      .pipe(  catchError(this.handleError));
    }
    getCategory() {
 return this.http.get(`${Config.api_endpoint}/get-category`)
      .pipe(catchError(this.handleError), publishReplay(1),
      refCount());
    }
    addQuestion(data, type) {
       return this.http.post(`${Config.api_endpoint}/${type}-question`, data)
      .pipe(catchError(this.handleError));
    }
    getQuestionListing(obj) {
      return this.http.get(`${Config.api_endpoint}/get-question?skill=${obj.skill}`)
      .pipe(catchError(this.handleError));
    }
    getQuestion(obj) {
      return this.http.get(`${Config.api_endpoint}/get-question-by-id?id=${obj.id}`)
      .pipe(catchError(this.handleError));
    }
    clearCache() {
      this.category = null;
  }
  deleteQuestion(data) {
    return this.http.post(`${Config.api_endpoint}/delete-question`, data)
    .pipe(catchError(this.handleError));
  }
  verifyExamCode(data) {
    return this.http.post(`${Config.api_endpoint}/verify-exam-code`, data)
    .pipe(catchError(this.handleError));
  }
  submitExam(data, exam_finished) {
    return this.http.post(`${Config.api_endpoint}/submit-exam?exam_finished=${exam_finished}`, data)
    .pipe(catchError(this.handleError));
  }
  getCandidate() {
    return this.http.get(`${Config.api_endpoint}/get-candidate`)
    .pipe(catchError(this.handleError));
  }
  getCandidatelisting() {
    return this.http.get(`${Config.api_endpoint}/get-candidate-listing`)
    .pipe(catchError(this.handleError));
  }
  getResult(id) {
    return this.http.get(`${Config.api_endpoint}/get-candidate-result?id=${id}`)
    .pipe(catchError(this.handleError));
  }
  getCandidateScore(data) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Config.api_endpoint}/get-candidate-score?skill_id=${data.skill_id.id}&examination_code=${data.examination_code}`)
    .pipe(catchError(this.handleError));
  }
  generateExamCode(data) {
    return this.http.post(`${Config.api_endpoint}/assign-exam-candidate`, data)
    .pipe(catchError(this.handleError));
  }
  getQuizQuestionListing(obj) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${Config.api_endpoint}/get-quiz-question?skill=${obj.skill}&difficulty=${obj.difficulty}&easy=${obj.easy}&medium=${obj.medium}`)
    .pipe(catchError(this.handleError));
  }
  updateStatusQuestion(data) {
    return this.http.post(`${Config.api_endpoint}/deactive-question`, data)
    .pipe(catchError(this.handleError));
   }
   addCandidate(data, obj) {
     if (obj.type === 'update') {
      data.id = obj.id;
      return this.http.post(`${Config.api_endpoint}/update-candidate`, data)
      .pipe(catchError(this.handleError));
     } else {
      return this.http.post(`${Config.api_endpoint}/add-candidate`, data)
      .pipe(catchError(this.handleError));
     }
   }
   deleteCandidate(data) {
    return this.http.post(`${Config.api_endpoint}/delete-candidate`, data)
    .pipe(catchError(this.handleError));
   }
   getCandidateById(data) {
    return this.http.get(`${Config.api_endpoint}/get-candidate-byid?id=${data.id}`)
    .pipe(catchError(this.handleError));
   }
   uploadResumeImage(data) {
    return this.http.post(`${Config.api_endpoint}/add-candidate-resume`, data)
    .pipe(catchError(this.handleError));
   }

   uploadQuestionImage(data) {
    return this.http.post(`${Config.api_endpoint}/update-question-image`, data)
    .pipe(catchError(this.handleError));
   }
  }

