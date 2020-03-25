import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Adresse } from 'src/app/models';

@Component({
  selector: 'pg-adresse',
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.scss']
})
export class AdresseComponent implements OnInit, OnChanges {

  @Input() adresse: Adresse;

  @Input() canDelete: boolean;

  constructor() { }

  ngOnChanges() {

  }

  ngOnInit(): void {
  }

}
