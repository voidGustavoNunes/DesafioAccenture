import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/modules/Empresa';
import { CepService } from 'src/app/service/CepService';
import { CEPValidator } from 'src/app/shared/validators/CepValidator';
import { CNPJValidator } from 'src/app/shared/validators/CnpjValidator';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa.form.component.html',
  styleUrls: ['./empresa.form.component.scss']
})
export class EmpresaFormComponent implements OnInit{

  @Input() empresa: Empresa | null = null;
  @Output() save = new EventEmitter<Empresa>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;
  validatingCep = false;
  cepInvalid = false;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.empresa) {
      this.form.patchValue(this.empresa);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      id: [null],
      cnpj: ['', [Validators.required, CNPJValidator.validate]],
      nomeFantasia: ['', [Validators.required, Validators.minLength(3)]],
      cep: ['', [Validators.required, CEPValidator.validate]]
    });

    // Adiciona validação assíncrona para o CEP
    this.form.get('cep')?.valueChanges.subscribe(cep => {
      if (cep && cep.length === 8) {
        this.validateCep(cep);
      }
    });
  }

  validateCep(cep: string): void {
    this.validatingCep = true;
    this.cepService.validate(cep).subscribe({
      next: (result) => {
        this.validatingCep = false;
        this.cepInvalid = !result;
        if (!result) {
          this.form.get('cep')?.setErrors({ invalidCep: true });
        }
      },
      error: () => {
        this.validatingCep = false;
        this.cepInvalid = true;
        this.form.get('cep')?.setErrors({ invalidCep: true });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const empresa: Empresa = this.form.value;
      this.save.emit(empresa);
    } else {
      // Marca todos os campos como touched para mostrar os erros
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

