import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Empresa } from 'src/app/modules/Empresa';
import { CepService } from 'src/app/service/CepService';
import { EmpresaService } from 'src/app/service/EmpresaService';
import { CEPValidator } from 'src/app/shared/validators/CepValidator';
import { CNPJValidator } from 'src/app/shared/validators/CnpjValidator';
import { NotificationService } from '../../../service/NotificationService';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa.form.component.html',
  styleUrls: ['./empresa.form.component.scss']
})
export class EmpresaFormComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  validatingCep = false;
  cepInvalid = false;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private empresaService: EmpresaService,
    private notificationService: NotificationService // Ou seu serviço de mensagens
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      id: [null],
      cnpj: ['', [Validators.required, CNPJValidator.validate]],
      nomeFantasia: ['', [Validators.required, Validators.minLength(3)]],
      cep: ['', [Validators.required, CEPValidator.validate]]
    });

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
    if (this.form.invalid) {
      // Marca todos os campos como touched para mostrar os erros
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const empresa: Empresa = this.form.value;

    const operation = empresa.id
      ? this.empresaService.update(empresa.id, empresa)
      : this.empresaService.create(empresa);

    operation.pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => {
        this.notificationService.success(empresa.id ? 'Empresa atualizada com sucesso!' : 'Empresa criada com sucesso!');
        // Limpa o formulário se for uma criação
        if (!empresa.id) {
          this.form.reset();
        }
      },
      error: (err) => {
        this.notificationService.error(
          'Ocorreu um erro ao salvar a empresa'
        );
      }
    });
  }
}
