import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdresseService, AdresseTypeService } from 'src/app/services';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Adresse, AdresseType } from 'src/app/models';

@Component({
  selector: 'pg-adresse-list',
  templateUrl: './adresse-list.component.html',
  styleUrls: ['./adresse-list.component.scss']
})
export class AdresseListComponent implements OnInit {
  private adresses: Observable <Adresse[]>;
  private adresse_type: Observable <AdresseType[]>;
  private client_id: number;

  constructor(private adresseService: AdresseService,
    private adresseTypeService: AdresseTypeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.adresses = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.client_id = +params.get('client_id');
        return this.adresseService.getList(this.client_id);
      })
    );
    this.adresse_type = this.adresseTypeService.getAll();
  }

}
