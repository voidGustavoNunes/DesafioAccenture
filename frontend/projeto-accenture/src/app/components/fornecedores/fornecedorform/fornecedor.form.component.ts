import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { CepService } from 'src/app/service/CepService';
import { FornecedorService } from 'src/app/service/FornecedorService';
import { NotificationService } from 'src/app/service/NotificationService';
import { CEPValidator } from 'src/app/shared/validators/CepValidator';
import { CNPJValidator } from 'src/app/shared/validators/CnpjValidator';
import { CPFValidator } from 'src/app/shared/validators/CpfValidator';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor.form.component.html',
  styleUrls: ['./fornecedor.form.component.scss']
})
export class FornecedorFormComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  validatingCep = false;
  cepInfo: any = null;
  tipoPessoa = {
    FISICA: 'FISICA',
    JURIDICA: 'JURIDICA'
  };

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private fornecedorService: FornecedorService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFornecedorIfEditing();
  }

  initForm(): void {
    this.form = this.fb.group({
      id: [null],
      tipo: [this.tipoPessoa.JURIDICA, [Validators.required]],
      identificador: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, CEPValidator.validate]],
      rg: [''],
      dataNascimento: [null]
    });

    // Monitora mudanças no tipo de pessoa
    this.form.get('tipo')?.valueChanges.subscribe(tipo => {
      this.updateValidators(tipo);
    });

    // Validação do CEP
    this.form.get('cep')?.valueChanges.subscribe(cep => {
      if (cep && cep.length === 8) {
        this.validateCep(cep);
      }
    });

    this.updateValidators(this.form.get('tipo')?.value);
  }

  updateValidators(tipo: string): void {
    const identificadorControl = this.form.get('identificador');
    const rgControl = this.form.get('rg');
    const dataNascimentoControl = this.form.get('dataNascimento');

    if (tipo === this.tipoPessoa.FISICA) {
      identificadorControl?.setValidators([Validators.required, CPFValidator.validate]);
      rgControl?.setValidators([Validators.required]);
      dataNascimentoControl?.setValidators([Validators.required]);
    } else {
      identificadorControl?.setValidators([Validators.required, CNPJValidator.validate]);
      rgControl?.clearValidators();
      dataNascimentoControl?.clearValidators();
    }

    identificadorControl?.updateValueAndValidity();
    rgControl?.updateValueAndValidity();
    dataNascimentoControl?.updateValueAndValidity();
  }

  loadFornecedorIfEditing(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.fornecedorService.getEntity(+id).subscribe({
        next: (fornecedor) => {
          this.form.patchValue(fornecedor);
          this.updateValidators(fornecedor.tipo);
          this.loading = false;

          if (fornecedor.cep) {
            this.validateCep(fornecedor.cep);
          }
        },
        error: (err) => {
          this.notificationService.error('Erro ao carregar fornecedor para edição');
          this.router.navigate(['/fornecedores']);
          this.loading = false;
        }
      });
    }
  }

  validateCep(cep: string): void {
    this.validatingCep = true;
    this.cepService.validate(cep).subscribe({
      next: (result) => {
        this.validatingCep = false;
        if (result && result.address) {
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
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const fornecedor = this.form.value;

    const operation = fornecedor.id
      ? this.fornecedorService.update(fornecedor.id, fornecedor)
      : this.fornecedorService.create(fornecedor);

    operation.pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => {
        this.notificationService.success(
          fornecedor.id ? 'Fornecedor atualizado com sucesso!' : 'Fornecedor cadastrado com sucesso!'
        );
        // Redireciona para a lista de fornecedores após sucesso
        this.router.navigate(['/fornecedores']);
      },
      error: (err) => {
        this.notificationService.error('Erro ao salvar fornecedor');
      }
    });
  }
}
