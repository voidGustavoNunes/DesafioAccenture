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
        // Filtrar fornecedores que já estão associados à empresa
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

      // Buscar o fornecedor da lista
      const fornecedor = this.allFornecedores.find(f => f.id === fornecedorId);
      if (fornecedor) {
        // Adicionar à lista de fornecedores da empresa
        if (!this.empresa.fornecedores) {
          this.empresa.fornecedores = [];
        }
        this.empresa.fornecedores.push(fornecedor);

        // Atualizar a empresa no backend
        this.empresaService.update(this.empresa.id, this.empresa).subscribe({
          next: () => {
            // Remover o fornecedor da lista de disponíveis
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
  }

  removerFornecedor(fornecedorId: ID): void {
    if (confirm('Tem certeza que deseja remover este fornecedor da empresa?')) {
      // Remover o fornecedor da lista de fornecedores da empresa
      if (this.empresa.fornecedores) {
        const fornecedor = this.empresa.fornecedores.find(f => f.id === fornecedorId);
        this.empresa.fornecedores = this.empresa.fornecedores.filter(f => f.id !== fornecedorId);

        // Atualizar a empresa no backend
        this.empresaService.update(this.empresa.id, this.empresa).subscribe({
          next: () => {
            // Adicionar o fornecedor de volta à lista de disponíveis, se existir
            if (fornecedor) {
              this.allFornecedores.push(fornecedor);
              // Ordenar por nome para melhor usabilidade
              this.allFornecedores.sort((a, b) => a.nome.localeCompare(b.nome));
            }
          },
          error: (err) => {
            this.error = 'Erro ao remover fornecedor';
            console.error(err);
          }
        });
      }
    }
  }

  getTipoPessoaLabel(tipo: TipoPessoa): string {
    return tipo === TipoPessoa.FISICA ? 'FISICA' : 'JURIDICA';
  }
}

