import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatSort,  MatTable} from '@angular/material';
import { WebservicesService } from '../../services/webservices.service';
import { DataService } from '../../../data.service';
import { Config } from 'src/app/config';
import { Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
export interface DialogData {
}
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-candidate-listing',
  templateUrl: './candidate-listing.component.html',
  styleUrls: ['../candidate.component.css']
})
export class CandidateListingComponent implements OnInit {
  @ViewChild('table') table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  candidatelist: any = [];
  displayedColumns: string[] = ['position', 'name', 'email',
  'education', 'experience', 'phone', 'refrence', 'resume' , 'skill', 'createdAt', 'action'];
  constructor(public _services: WebservicesService, public route: ActivatedRoute, public msg: DataService, public dialog: MatDialog) {
  }
  applyFilter(filterValue: string) {
    this.candidatelist.filter = filterValue.trim().toLowerCase();
  }
  openDialog(item) {
    this.dialog.open(DialogDataExampleDialog, {
      data:  item
    });
  }
  ngOnInit() {
    this._services.getCandidate().subscribe((response: any) => {
      const result = response.response.data;
      const candidate = [];
      result.forEach(data => {
        const element = data.candidate;
        const resultdata = data.result;
        const obj = Object.assign({}) ;
        obj.address = element.address;
        obj.candidate_email = element.candidate_email;
        obj.candidate_name = element.candidate_name;
        obj.createdAt = element.createdAt;
        obj.education = element.education;
        obj.experience = element.experience;
        obj.id = element.id;
        obj.phone = element.phone;
        obj.refrence = element.refrence;
        obj.resume = (element.resume) ? `${Config.cv_endpoint}/cv/${element.resume}` : '';
        obj.updatedAt = element.updatedAt;
        obj.result = resultdata;
        candidate.push(obj);
      });
      candidate.sort((a, b): any => {
        const date1 = new Date(a.createdAt);
        const date2 = new Date(b.createdAt);
        return date2.getTime() -  date1.getTime();
      });
      this.candidatelist = new MatTableDataSource(candidate);
      this.candidatelist.paginator = this.paginator;
    });
  }
  deleteCandidate(item, index) {
    const confirmAlert = confirm('Are you sure want to this item ?');
    if (confirmAlert === true) {
      const obj = {
        id: item.id
      };
      this._services.deleteCandidate(obj).subscribe((response: any) => {
        this.candidatelist.splice(index, 1);
        this.table.renderRows();
      });
    }
  }
}












@Component({
  selector: 'result',
  templateUrl: 'result.html',
})
export class DialogDataExampleDialog extends CandidateListingComponent {
  result: DialogData;
  resultListing: any = [];
  score: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, options: CandidateListingComponent) {
    super(options._services, options.route, options.msg, options.dialog);
  }
  ngOnInit() {
    const examcode = [];
    const result = this.data['result'];
    result.forEach(element => {
      const object =   Object.assign({});
      if (examcode.findIndex(i => i.examination_code === element.examination_code) === -1) {
        object.examination_code = element.examination_code;
        object.createdAt = element.createdAt;
        object.exam_over = element.exam_over;
        examcode.push(object);
      }
    });
    this.resultListing = examcode;
  }
  getScore(code) {
    const re = [];
    const result = this.data['result'];
    result.forEach(element => {
      const object =   Object.assign({});
      if (element.examination_code === code) {
        object.skill = element.skill_id;
        object.percentage = element.percentage;
        re.push(object);
      }
    });
    this.score = re;
  }
}
