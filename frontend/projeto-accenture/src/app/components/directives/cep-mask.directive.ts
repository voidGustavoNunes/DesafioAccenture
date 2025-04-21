import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCepMask]'
})
export class CepMaskDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 8) {
      value = value.substring(0, 8);
    }

    if (value.length > 5) {
      value = `${value.substring(0, 5)}-${value.substring(5)}`;
    }

    this.ngControl.control?.setValue(value, { emitEvent: false });
  }
}
