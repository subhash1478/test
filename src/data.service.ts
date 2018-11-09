import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(public snackBar: MatSnackBar, ) { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  openSnackBar(msg) {
    this.snackBar.open(msg, 'Ok', {
      duration: 1500
    });
  }
}
