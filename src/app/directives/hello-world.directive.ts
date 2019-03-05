import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHelloWorld]'
})
export class HelloWorldDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = 'blue'
  }

}
