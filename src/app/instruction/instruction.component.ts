import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {
  disabled:boolean
  constructor(public router:Router) { }
  @Input('color') public color: string;

  ngOnInit() {
  }
 
}
