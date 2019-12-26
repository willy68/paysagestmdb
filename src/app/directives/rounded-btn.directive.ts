import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[pgRoundedBtn]'
})
export class RoundedBtnDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '4rem'/*'15% / 50%'*/);
  }

}
