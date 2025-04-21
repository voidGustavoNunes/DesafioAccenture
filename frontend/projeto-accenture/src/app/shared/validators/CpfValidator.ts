import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CPFValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const cpf = control.value.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return { invalidCpf: true };
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return { invalidCpf: true };
    }

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let dv1 = remainder < 2 ? 0 : 11 - remainder;

    if (dv1 !== parseInt(cpf.charAt(9))) {
      return { invalidCpf: true };
    }

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    let dv2 = remainder < 2 ? 0 : 11 - remainder;

    if (dv2 !== parseInt(cpf.charAt(10))) {
      return { invalidCpf: true };
    }

    return null;
  }
}
