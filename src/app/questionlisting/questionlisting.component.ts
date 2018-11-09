import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatSort, MatTable} from '@angular/material';
import { WebservicesService } from '../services/webservices.service';
import { Router } from '@angular/router';


import { DataService } from '../../data.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

  
 @Component({
  selector: 'app-questionlisting',
  templateUrl: './questionlisting.component.html',
  styleUrls: ['./questionlisting.component.css']
})
export class QuestionlistingComponent implements  AfterViewInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'question', 'code', 'action', 'createdAt'];
  cssCode: string;
  checked = false;


  category: string;
  @ViewChild('table') table: MatTable<any>;

  @ViewChild(MatSort) sort: MatSort;
  QuestionListing: any = [];
  categoryList: any = [];
  dataSource: any = [];
  constructor(private _services: WebservicesService, public msg: DataService, private router: Router, ) {

  }
  applyFilter(filterValue: string) {
    this.QuestionListing.filter = filterValue.trim().toLowerCase();
  }
  getCategory() {
    this._services.getCategory().subscribe((response: any) => {
      const result: any = response.response.data;
      result.sort((a, b ) => {
        if (a.title > b.title) {
          return 1;
        }
        return 0;

      });


      this.categoryList = result;

      this.category = result[0].id;
      this.getQuestion();
    }, (error) => {
    });
  }
  ngAfterViewInit() {
    this.getCategory();

  }

  getQuestion() {
    const obj = {
      skill: this.category
    };
    this._services.getQuestionListing(obj).subscribe((response: any) => {
      const result = response.response.data;


      this.QuestionListing =  new MatTableDataSource(result); 
      this.QuestionListing.paginator = this.paginator;

    });
  }

  deleteQuestion(item, index) {



    const confirmAlert = confirm('Are you sure want to this item ?');
    if (confirmAlert === true) {
      const obj = {
        id: item.id
      };
      this._services.deleteQuestion(obj).subscribe((response: any) => {
        this.QuestionListing.splice(index, 1);
        this.table.renderRows();

      });

    }
  }

  onStatusChange(event) {
    this._services.updateStatusQuestion(event).subscribe((response: any) => {

const msg = response.response.message;
this.msg.openSnackBar(msg);

    }, (error) => {



    });
  }
}
