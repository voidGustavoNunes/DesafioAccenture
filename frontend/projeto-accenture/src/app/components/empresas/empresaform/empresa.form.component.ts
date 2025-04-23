import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Empresa } from 'src/app/modules/Empresa';
import { CepService } from 'src/app/service/CepService';
import { EmpresaService } from 'src/app/service/EmpresaService';
import { CEPValidator } from 'src/app/shared/validators/CepValidator';
import { CNPJValidator } from 'src/app/shared/validators/CnpjValidator';
import { NotificationService } from '../../../service/NotificationService';
import { ActivatedRoute, Router } from '@angular/router';

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
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEmpresaIfEditing();
  }

  loadEmpresaIfEditing(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.empresaService.getEntity(+id).subscribe({
        next: (empresa) => {
          this.form.patchValue(empresa);
          this.loading = false;
        },
        error: (err) => {
          this.notificationService.error('Erro ao carregar empresa para edição');
          this.router.navigate(['/empresas']);
          this.loading = false;
        }
      });
    }
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
        this.notificationService.success(
          empresa.id ? 'Empresa atualizada com sucesso!' : 'Empresa criada com sucesso!'
        );
        this.router.navigate(['/empresas']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Ocorreu um erro ao salvar a empresa';
        this.notificationService.error(errorMessage);
      }
    });
  }
}
