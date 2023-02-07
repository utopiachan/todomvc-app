import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  constructor(
    private readonly elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }

}
