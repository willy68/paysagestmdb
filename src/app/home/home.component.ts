import { Component, OnInit } from '@angular/core';
/*import {
  NgbModal,
  ModalDismissReasons,
  NgbModalConfig
} from '@ng-bootstrap/ng-bootstrap';
*/
@Component({
  selector: 'pg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  date: any;

  login = '';

  constructor(/*config: NgbModalConfig, private modalService: NgbModal*/) {
    // config.backdrop = 'static';
  }
/*
  open(content) {
      this.modalService.open(content, { centered: true }).result.then(
          (closeResult) => {
              // modal close
              console.log('modal closed : ', closeResult);
          }, (dismissReason) => {
              // modal Dismiss
              if (dismissReason === ModalDismissReasons.ESC) {
                  console.log('modal dismissed when used pressed ESC button');
              } else if (dismissReason === ModalDismissReasons.BACKDROP_CLICK) {
                  console.log('modal dismissed when used pressed backdrop');
              } else {
                  console.log(dismissReason);
              }
          });
  }
*/
  ngOnInit() {
  }

}
