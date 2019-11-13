import { Component, OnInit } from '@angular/core';
// import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

// import { HighlightTableRowDirective } from '../directives';

@Component({
  selector: 'pg-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  // public faUserAlt = faUserAlt;
  public emptyList = false;
  public games: Array<{game: String,
                        platform: String,
                        release: String}> = [{
                            game : 'Deus Ex: Mankind Divided',
                            platform: 'Xbox One, PS4, PC',
                            release : 'August 23'
                        },
                        {
                            game : 'Amplitude',
                            platform: 'PS4',
                            release : 'January 5'
                        },
                        {
                            game : 'The Huntsman: Winter\'s Curse',
                            platform: 'PS4',
                            release : 'August 23'
                        },
                        {
                            game : 'Resident Evil Zero HD Remaster',
                            platform: 'Win, PS3, PS4, X360, XBO',
                            release : 'January 19'
                        },
                        {
                            game : 'Lego Marvel\'s Avengers',
                            platform: 'Win, X360, XBO, PS3, PS4, PSVita, WiiU, 3DS',
                            release : 'January 26'
                        }];

  constructor() {
  }

  ngOnInit() {

  }

}
