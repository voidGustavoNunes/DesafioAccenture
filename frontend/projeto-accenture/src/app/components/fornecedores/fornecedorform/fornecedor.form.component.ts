import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cep } from 'src/app/modules/Cep';
import { TipoPessoa } from 'src/app/modules/enums/TipoPessoa';
import { Fornecedor } from 'src/app/modules/Fornecedor';
import { CepService } from 'src/app/service/CepService';
import { CEPValidator } from 'src/app/shared/validators/CepValidator';
import { CNPJValidator } from 'src/app/shared/validators/CnpjValidator';
import { CPFValidator } from 'src/app/shared/validators/CpfValidator';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor.form.component.html',
  styleUrls: ['./fornecedor.form.component.scss']
})
export class FornecedorFormComponent implements OnInit {
  @Input() fornecedor: Fornecedor | null = null;
  @Output() save = new EventEmitter<Fornecedor>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;
  validatingCep = false;
  cepInfo: Cep | null = null;
  tipoPessoa = TipoPessoa;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.fornecedor) {
      this.form.patchValue(this.fornecedor);
      // Se for edição, validar o CEP novamente para carregar os dados
      if (this.fornecedor.cep) {
        this.validateCep(this.fornecedor.cep);
      }
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      id: [null],
      tipo: [TipoPessoa.JURIDICA, [Validators.required]],
      identificador: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, CEPValidator.validate]],
      rg: [''],
      dataNascimento: [null]
    });

    // Monitora mudanças no tipo de pessoa para ajustar validações
    this.form.get('tipo')?.valueChanges.subscribe(tipo => {
      this.updateValidators(tipo);
    });

    // Validação assíncrona para o CEP
    this.form.get('cep')?.valueChanges.subscribe(cep => {
      if (cep && cep.length === 8) {
        this.validateCep(cep);
      }
    });

    // Inicializa validadores com base no tipo inicial
    this.updateValidators(this.form.get('tipo')?.value);
  }

  updateValidators(tipo: TipoPessoa): void {
    const identificadorControl = this.form.get('identificador');
    const rgControl = this.form.get('rg');
    const dataNascimentoControl = this.form.get('dataNascimento');

    if (tipo === TipoPessoa.FISICA) {
      identificadorControl?.clearValidators();
      identificadorControl?.setValidators([Validators.required, CPFValidator.validate]);
      rgControl?.setValidators([Validators.required]);
      dataNascimentoControl?.setValidators([Validators.required]);
    } else {
      identificadorControl?.clearValidators();
      identificadorControl?.setValidators([Validators.required, CNPJValidator.validate]);
      rgControl?.clearValidators();
      dataNascimentoControl?.clearValidators();
    }

    identificadorControl?.updateValueAndValidity();
    rgControl?.updateValueAndValidity();
    dataNascimentoControl?.updateValueAndValidity();
  }

  validateCep(cep: string): void {
    this.validatingCep = true;
    this.cepService.validate(cep).subscribe({
      next: (result) => {
        this.validatingCep = false;
        if (result) {
          this.cepInfo = result;
        } else {
          this.form.get('cep')?.setErrors({ invalidCep: true });
          this.cepInfo = null;
        }
      },
      error: () => {
        this.validatingCep = false;
        this.form.get('cep')?.setErrors({ invalidCep: true });
        this.cepInfo = null;
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const fornecedor: Fornecedor = this.form.value;
      this.save.emit(fornecedor);
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
