import {
  Directive, ElementRef, HostListener,
  EventEmitter, Output, Input, Renderer2, OnInit
} from '@angular/core';

/**
* Table directive selection de lignes
* Tbody obligatoire
* Css :
* .table tr.active td {
*  background-color:#123456 !important;
*  color: white;
* }
*
* Event: SelectItem
*
* Todo: Add pageup pagedown handler
*/
@Directive({
  selector: '[pgHighlightTableRow]'
})
export class HighlightTableRowDirective implements OnInit {

  private trCollection: any;
  private tbody: any;
  private thead: any;
  private scrollTop = 0;
  private cancelScroll = false;
  private startIndex = 0;
  private selectedRow: number;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() height: string;

  @Output() selectItem = new EventEmitter<number>();

  @Output() selectChange = new EventEmitter<number>();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.trCollection || this.trCollection.length === 0) {
      this.trCollection = this.tbody[0].getElementsByTagName('tr');
      if (this.trCollection.length === 0) {
        return;
      }
    }
    const index: number = this.selectedRow;
    switch (event.code) {
      case 'ArrowUp':
        if (this.selectedRow === 0 || this.selectedRow === -1) {
          this.selectedRow = this.trCollection.length;
        }
        this.selectedRow--;
        this.changeSelect(index);
        break;
      case 'ArrowDown':
        if (this.selectedRow === this.trCollection.length - 1) {
          this.selectedRow = -1;
        }
        this.selectedRow++;
        this.changeSelect(index);
        break;
      case 'Enter':
        if (this.selectedRow !== -1) {
          this.selectItem.emit(this.selectedRow);
        }
      break;
      default:
        break;
    }
  }

  @HostListener('click', ['$event']) onMouseClick(event: MouseEvent) {
    const index: number = this.selectedRow;
    if (!this.trCollection || this.trCollection.length === 0) {
      this.trCollection = this.tbody[0].getElementsByTagName('tr');
      if (this.trCollection.length === 0) {
        return;
      }
    }

    if (this.trCollection[0].rowIndex > 0) {
      this.startIndex = this.trCollection[0].rowIndex;
    }

    let tr: any = event.target;
    while (tr.tagName !== 'TR') {
      tr = tr.parentElement;
    }
    this.selectedRow = tr.rowIndex - this.startIndex;
    this.changeSelect(index);
  }

  private changeSelect(prevIndex: number) {
    this.disableClass(prevIndex);
    this.setClickedRow(this.selectedRow);
    this.cancelScroll = true;
    this.doScroll(this.selectedRow);
    this.selectChange.emit(this.selectedRow);
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

  @HostListener('scroll', ['$event']) onScroll(event: any) {

    if (this.cancelScroll && this.scrollTop !== event.target.scrollTop) {
      event.target.scrollTop = this.scrollTop;
      this.cancelScroll = false;
    }
  }

  private doScroll(index: number) {
    const scrollBody = document.getElementsByClassName('fixed-header');
    if (!scrollBody.length) { return; }

    let scrollBodyEl: any;
    let theadHeight = 0;
    const theadFixed = this.thead[0];
    if (theadFixed) {
      theadHeight = theadFixed.offsetHeight;
    }

    scrollBodyEl = scrollBody[0];
    const rowEl = this.trCollection[index];
    if (rowEl.offsetTop < scrollBodyEl.scrollTop + theadHeight) {
      this.scrollTop = scrollBodyEl.scrollTop = rowEl.offsetTop - theadHeight;
    } else if ((rowEl.offsetTop + rowEl.offsetHeight) >
      (scrollBodyEl.scrollTop + scrollBodyEl.offsetHeight)) {
      this.scrollTop = (scrollBodyEl.scrollTop += rowEl.offsetTop +
        rowEl.offsetHeight - scrollBodyEl.scrollTop - scrollBodyEl.offsetHeight);
    }
  }

  @HostListener('dblclick', ['$event']) onMouseDblClick(event: MouseEvent) {
    const index: number = this.selectedRow;
    if (!this.trCollection || this.trCollection.length === 0) {
      this.trCollection = this.tbody[0].getElementsByTagName('tr');
      if (this.trCollection.length === 0) {
        return;
      }
    }

    if (this.trCollection[0].rowIndex > 0) {
      this.startIndex = this.trCollection[0].rowIndex;
    }

    this.disableClass(index);
    let tr: any = event.target;
    while (tr.tagName !== 'TR') {
      tr = tr.parentElement;
    }
    this.selectedRow = tr.rowIndex - this.startIndex;
    this.setClickedRow(this.selectedRow);
    this.doScroll(this.selectedRow);
    if (this.selectedRow !== -1) {
      this.selectItem.emit(this.selectedRow);
    }
  }

  ngOnInit() {
    let height = '25em';
    if (this.height) {
      height = this.height;
    }
    this.renderer.setStyle(this.el.nativeElement, 'height', height);
    this.tbody = this.el.nativeElement.getElementsByTagName('tbody');
    this.thead = this.el.nativeElement.getElementsByTagName('thead');
    if (this.tbody.length > 0) {
      this.trCollection = this.tbody[0].getElementsByTagName('tr');
    } /*else {
      this.trCollection = this.el.nativeElement.getElementsByTagName('tr');
    }*/
    this.selectedRow = -1;
  }
}
