import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pg-entreprise-dashboard',
  templateUrl: './entreprise-dashboard.component.html',
  styleUrls: ['./entreprise-dashboard.component.scss']
})
export class EntrepriseDashboardComponent implements OnInit {
  public emptyList = false;
  public selectedItem: number;

  constructor() { }

  ngOnInit() {
  }

  onOpen(index: number) {

  }

  onEdit(index: number) {

  }

  onSelectChange(index: number) {
    this.selectedItem = index;
  }
}
