import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ID } from '@datorama/akita';
import { Empresa } from 'src/app/modules/Empresa';
import { TipoPessoa } from 'src/app/modules/enums/TipoPessoa';
import { Fornecedor } from 'src/app/modules/Fornecedor';
import { CepService } from 'src/app/service/CepService';
import { EmpresaService } from 'src/app/service/EmpresaService';
import { FornecedorService } from 'src/app/service/FornecedorService';

@Component({
  selector: 'app-associacao',
  templateUrl: './associacao.component.html',
  styleUrls: ['./associacao.component.scss']
})
export class AssociacaoComponent implements OnInit{
  @Input() empresa!: Empresa;

  allFornecedores: Fornecedor[] = [];
  fornecedorSelecionado = new FormControl<number | null>(null);
  loading = false;
  error: string | null = null;
  tipoPessoa = TipoPessoa;

  constructor(
    private empresaService: EmpresaService,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {
    this.loadFornecedores();
  }

  loadFornecedores(): void {
    this.loading = true;
    this.fornecedorService.getList().subscribe({
      next: (data) => {
        const fornecedoresIds = this.empresa.fornecedores?.map(f => f.id) || [];
        this.allFornecedores = data.filter(f => !fornecedoresIds.includes(f.id));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar fornecedores';
        this.loading = false;
        console.error(err);
      }
    });
  }

  associarFornecedor(): void {
    if (this.fornecedorSelecionado.value) {
      const fornecedorId = this.fornecedorSelecionado.value;
      this.loading = true;

      this.empresaService.associarFornecedor(this.empresa.id, fornecedorId).subscribe({
        next: (empresaAtualizada) => {
          this.empresa = empresaAtualizada;
          this.allFornecedores = this.allFornecedores.filter(f => f.id !== fornecedorId);
          this.fornecedorSelecionado.reset();
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao associar fornecedor';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  removerFornecedor(fornecedorId: ID): void {
    if (confirm('Tem certeza que deseja remover este fornecedor da empresa?')) {
      this.loading = true;

      this.empresaService.removerFornecedor(this.empresa.id, fornecedorId).subscribe({
        next: (empresaAtualizada) => {
          this.empresa = empresaAtualizada;
          this.loadFornecedores();
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao remover fornecedor';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  getTipoPessoaLabel(tipo: TipoPessoa): string {
    return tipo === TipoPessoa.FISICA ? 'FISICA' : 'JURIDICA';
  }

  formatarIdentificador(identificador: string): string {
    if (!identificador) return '';

    const digits = identificador.replace(/\D/g, '');

    //cpf
    if (digits.length === 11) {
      return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    //cnpj
    if (digits.length === 14) {
      return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return identificador;
  }

  formatarCep(cep: string): string {
    if (!cep) return '';

    const digits = cep.replace(/\D/g, '');

    if (digits.length === 8) {
      return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    return cep;
  }
}

