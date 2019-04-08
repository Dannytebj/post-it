import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickElseWhere]'
})
export class ClickElseWhereDirective {

  @Output() appClickElseWhere = new EventEmitter<MouseEvent>();
  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement && !this.el.nativeElement.contains(targetElement)) {
      this.appClickElseWhere.emit(event);
    }
  }

}
