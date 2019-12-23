import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightTableRowDirective } from './highlightrow.directive';
import { RoundedBtnDirective } from './rounded-btn.directive';


@NgModule({
  declarations: [
    HighlightTableRowDirective,
    RoundedBtnDirective
  ],
  exports: [
    HighlightTableRowDirective,
    RoundedBtnDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
