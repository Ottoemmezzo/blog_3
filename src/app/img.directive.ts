import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]',
})
export class ImgDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
