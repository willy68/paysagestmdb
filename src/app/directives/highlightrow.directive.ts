import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';

/**
* Table directive selection de lignes
* Tbody obligatoire
* Css :
* .table tr.active td {
*  background-color:#123456 !important;
*  color: white;
* }
*
* Todo: Add pageup pagedown handler
*/
@Directive({
  selector: '[pgHighlightTableRow]'
})
export class HighlightTableRowDirective implements OnInit {

  private trCollection: any;
  private startIndex = 0;
  private selectedRow: number;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (this.trCollection.length === 0) { return; }
        const index: number = this.selectedRow;
        if (event.code === 'ArrowDown') {
          if (this.selectedRow === this.trCollection.length - 1) {
            this.selectedRow = -1;
          }
          this.selectedRow ++;
          this.disableClass(index);
          this.setClickedRow(this.selectedRow);
          this.doScroll(this.selectedRow);
        }
        if (event.code === 'ArrowUp') {
          if (this.selectedRow === 0 || this.selectedRow === -1) {
            this.selectedRow = this.trCollection.length;
          }
          this.selectedRow --;
          this.disableClass(index);
          this.setClickedRow(this.selectedRow);
          this.doScroll(this.selectedRow);
        }
    }

  @HostListener('click', ['$event']) onMouseClick(event: MouseEvent) {
    const index: number = this.selectedRow;
    if (this.trCollection.length > 0) {
      if (this.trCollection[0].rowIndex > 0) {
        this.startIndex = this.trCollection[0].rowIndex;
      }
    }
    this.disableClass(index);
    let tr: any = event.target;
    while (tr.tagName !== 'TR') {
      tr = tr.parentElement;
    }
    this.selectedRow = tr.rowIndex - this.startIndex;
    this.setClickedRow(this.selectedRow);
    this.doScroll(this.selectedRow);
}

  private setClickedRow(index: number) {
    if (index > -1 && index < this.trCollection.length) {
      this.renderer.addClass(this.trCollection[index], 'active');
    }
  }

  private disableClass(index: number) {
    if (index > -1 && index < this.trCollection.length) {
      this.renderer.removeClass(this.trCollection[index], 'active');
    }
  }
  
  private doScroll(index: number) {
    if (index > -1 && index < this.trCollection.length) {
      
      let scrollBodyEl: any;
      let theadHeight = 0;
      let theadFixed = this.el.nativeElement.getElementsByTagName('thead')[0];
      if (theadFixed) {
        theadHeight = theadFixed.offsetHeight;
      }
      let scrollBody = document.getElementsByClassName('fixed-header');
      if (!scrollBody.length)
        return;
      scrollBodyEl = scrollBody[0];
      let rowEl = this.trCollection[index];
      /*if (index === 0) {
        scrollBodyEl.scrollTop = 0;
      }*/
      if (rowEl.offsetTop < scrollBodyEl.scrollTop + theadHeight)
          scrollBodyEl.scrollTop = rowEl.offsetTop - theadHeight;
      else if ((rowEl.offsetTop + rowEl.offsetHeight) > 
              (scrollBodyEl.scrollTop + scrollBodyEl.offsetHeight)) {
          scrollBodyEl.scrollTop += rowEl.offsetTop + 
          rowEl.offsetHeight - scrollBodyEl.scrollTop - scrollBodyEl.offsetHeight;
      }
    }
  }

  ngOnInit() {
    const tbody = this.el.nativeElement.getElementsByTagName('tbody');
    if (tbody.length > 0) {
      this.trCollection = tbody[0].getElementsByTagName('tr');
    } else {
      this.trCollection = this.el.nativeElement.getElementsByTagName('tr');
    }
    this.selectedRow = -1;
  }
}
