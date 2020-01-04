import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'pg-yesnomodal',
  templateUrl: './yesnomodal.component.html',
  styleUrls: ['./yesnomodal.component.scss']
})
export class YesnomodalComponent implements OnInit {
  public action: Subject<any> = new Subject();
  public heading: string;
  public content: any;


  constructor(public modalRef: MDBModalRef) { }

  onYesClick() {
    this.action.next('yes');
  }

  onNoClick() {
    this.action.next('No');
  }

  ngOnInit() {
  }

}
