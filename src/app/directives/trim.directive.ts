import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[trimFormControl]',
})
export class TrimDirective {
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);
  private ngControl: NgControl = inject(NgControl);

  @HostListener('focusout', ['$event.target.value'])
  trim(value: string) {
    const trimmedValue: string = value.trim();
    this.renderer.setProperty(this.el.nativeElement, 'value', trimmedValue);

    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(trimmedValue);
      this.ngControl.control.markAsTouched();
    }
  }
}
