import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';

/*
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
        }
        if (event.code === 'ArrowUp') {
          if (this.selectedRow === 0 || this.selectedRow === -1) {
            this.selectedRow = this.trCollection.length;
          }
          this.selectedRow --;
          this.disableClass(index);
          this.setClickedRow(this.selectedRow);
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
  /*
   private doScroll() {
        let index = this.table.selection ? this.table.value.findIndex(item => item.id == this.table.selection.id) : 0;
        let scrollBodyEl = this.table.el.nativeElement.getElementsByClassName('ui-table-scrollable-body')[0];
        let tbodyEl = scrollBodyEl.getElementsByClassName('ui-table-tbody')[0];
        if (!tbodyEl.children.length)
            return;
        let rowEl = tbodyEl.children[index];
        if (rowEl.offsetTop < scrollBodyEl.scrollTop)
            scrollBodyEl.scrollTop = rowEl.offsetTop;
        else if ((rowEl.offsetTop + rowEl.offsetHeight) > (scrollBodyEl.scrollTop + scrollBodyEl.offsetHeight - 17)) {
            scrollBodyEl.scrollTop += rowEl.offsetTop + rowEl.offsetHeight - scrollBodyEl.scrollTop - scrollBodyEl.offsetHeight + 17;
        }
    }*/

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
