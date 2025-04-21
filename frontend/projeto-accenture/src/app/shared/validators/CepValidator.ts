import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CEPValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const cep = control.value.replace(/\D/g, '');

    // CEP deve ter 8 dígitos
    if (cep.length !== 8) {
      return { pattern: true };
    }

    return null;
  }
}
