import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  date: any;

  login = '';

  constructor() {
  }

  ngOnInit() {
  }

}
