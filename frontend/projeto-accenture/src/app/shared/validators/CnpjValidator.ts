import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CNPJValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const cnpj = control.value.replace(/\D/g, '');

    if (cnpj.length !== 14) {
      return { invalidCnpj: true };
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj)) {
      return { invalidCnpj: true };
    }

    // Validação do primeiro dígito verificador
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);

    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) {
      return { invalidCnpj: true };
    }

    // Validação do segundo dígito verificador
    size++;
    numbers = cnpj.substring(0, size);

    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) {
      return { invalidCnpj: true };
    }

    return null;
  }
}
