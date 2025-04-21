import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCnpjMask]'
})
export class CnpjMaskDirective {
  @Input('appCnpjMask') appCnpjMask: boolean = true;

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    if (!this.appCnpjMask) return;

    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 14) {
      value = value.substring(0, 14);
    }

    if (value.length > 12) {
      value = `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5, 8)}/${value.substring(8, 12)}-${value.substring(12)}`;
    } else if (value.length > 8) {
      value = `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5, 8)}/${value.substring(8)}`;
    } else if (value.length > 5) {
      value = `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5)}`;
    } else if (value.length > 2) {
      value = `${value.substring(0, 2)}.${value.substring(2)}`;
    }

    this.ngControl.control?.setValue(value, { emitEvent: false });
  }

}
