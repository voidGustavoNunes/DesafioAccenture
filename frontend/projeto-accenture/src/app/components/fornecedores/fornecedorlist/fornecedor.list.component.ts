import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ID } from '@datorama/akita';
import { TipoPessoa } from 'src/app/modules/enums/TipoPessoa';
import { Fornecedor } from 'src/app/modules/Fornecedor';
import { FornecedorService } from 'src/app/service/FornecedorService';
import { LoadingService } from 'src/app/service/LoadingService';
import { NotificationService } from 'src/app/service/NotificationService';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor.list.component.html',
  styleUrls: ['./fornecedor.list.component.scss']
})
export class FornecedorListComponent implements OnInit {

  @Output() editFornecedor = new EventEmitter<Fornecedor>();

  fornecedores: (Fornecedor & { editMode?: boolean, originalValue?: Fornecedor })[] = [];
  filteredFornecedores: (Fornecedor & { editMode?: boolean })[] = [];
  loading = false;
  error: string | null = null;
  filterForm!: FormGroup;
  tipoPessoa = TipoPessoa;
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private fornecedorService: FornecedorService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initFilterForm();
    this.loadFornecedores();
  }

  initFilterForm(): void {
    this.filterForm = this.fb.group({
      nome: [''],
      identificador: [''],
      tipo: ['']
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.currentPage = 1;
      this.applyFilters();
    });
  }

  loadFornecedores(): void {
    this.loadingService.show();
    this.fornecedorService.getList().subscribe({
      next: (data) => {
        this.fornecedores = data.map(fornecedor => ({
          ...fornecedor,
          editMode: false,
          originalValue: {...fornecedor}
        }));
        this.totalItems = this.fornecedores.length;
        this.applyFilters();
        this.loadingService.hide();
      },
      error: (err) => {
        this.error = 'Erro ao carregar fornecedores';
        this.notificationService.error('Erro ao carregar fornecedores');
        this.loadingService.hide();
        console.error(err);
      }
    });
  }

  applyFilters(): void {
    const { nome, identificador, tipo } = this.filterForm.value;

    let filtered = this.fornecedores.filter(fornecedor => {
      const nomeMatch = !nome || fornecedor.nome.toLowerCase().includes(nome.toLowerCase());
      const identificadorMatch = !identificador ||
        fornecedor.identificador.replace(/\D/g, '').includes(identificador.replace(/\D/g, ''));
      const tipoMatch = !tipo || fornecedor.tipo === tipo;

      return nomeMatch && identificadorMatch && tipoMatch;
    });

    this.totalItems = filtered.length;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredFornecedores = filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.currentPage = 1;
    this.applyFilters();
  }

  toggleEditMode(fornecedor: Fornecedor & { editMode?: boolean, originalValue?: Fornecedor }): void {
    if (fornecedor.editMode) {
      return;
    }
    fornecedor.editMode = true;
    fornecedor.originalValue = {...fornecedor};
  }

  cancelEdit(fornecedor: Fornecedor & { editMode?: boolean, originalValue?: Fornecedor }): void {
    if (fornecedor.originalValue) {
      Object.assign(fornecedor, fornecedor.originalValue);
    }
    fornecedor.editMode = false;
  }

  saveInlineEdit(fornecedor: Fornecedor & { editMode?: boolean }): void {
    this.loadingService.show();
    this.fornecedorService.update(fornecedor.id, fornecedor).subscribe({
      next: (updatedFornecedor) => {
        const index = this.fornecedores.findIndex(f => f.id === updatedFornecedor.id);
        if (index !== -1) {
          this.fornecedores[index] = {
            ...updatedFornecedor,
            editMode: false,
            originalValue: {...updatedFornecedor}
          };
          this.applyFilters();
          this.notificationService.success('Fornecedor atualizado com sucesso!');
        }
        this.loadingService.hide();
      },
      error: (err) => {
        this.error = 'Erro ao atualizar fornecedor';
        this.notificationService.error('Erro ao atualizar fornecedor');
        this.loadingService.hide();
        console.error(err);
        const originalIndex = this.fornecedores.findIndex(f => f.id === fornecedor.id);
        if (originalIndex !== -1 && this.fornecedores[originalIndex].originalValue) {
          Object.assign(this.fornecedores[originalIndex], this.fornecedores[originalIndex].originalValue);
          this.fornecedores[originalIndex].editMode = false;
        }
      }
    });
  }

  deleteFornecedor(id: ID): void {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      this.loadingService.show();
      this.fornecedorService.delete(id).subscribe({
        next: () => {
          this.fornecedores = this.fornecedores.filter(f => f.id !== id);
          this.applyFilters();
          this.notificationService.success('Fornecedor excluído com sucesso!');
          this.loadingService.hide();
        },
        error: (err) => {
          this.error = 'Erro ao excluir fornecedor';
          this.notificationService.error('Erro ao excluir fornecedor');
          this.loadingService.hide();
          console.error(err);
        }
      });
    }
  }

  getTipoPessoaLabel(tipo: TipoPessoa): string {
    return tipo === TipoPessoa.FISICA ? 'Pessoa Física' : 'Pessoa Jurídica';
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  isFornecedorMenorIdade(fornecedor: Fornecedor): boolean {
    if (fornecedor.tipo !== TipoPessoa.FISICA || !fornecedor.dataNascimento) {
      return false;
    }

    const birthDate = new Date(fornecedor.dataNascimento);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    return age < 18 || (age === 18 && monthDiff < 0) ||
           (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate());
  }
}
