import { Component, OnInit } from '@angular/core';
import { ID } from '@datorama/akita';
import { Empresa } from 'src/app/modules/Empresa';
import { EmpresaService } from 'src/app/service/EmpresaService';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa.list.component.html',
  styleUrls: ['./empresa.list.component.scss']
})
export class EmpresaListComponent implements OnInit {
  empresas: (Empresa & { editMode?: boolean })[] = [];
  originalEmpresas: Empresa[] = [];
  loading = false;
  error: string | null = null;

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas(): void {
    this.loading = true;
    this.empresaService.getList().subscribe({
      next: (data) => {
        this.originalEmpresas = [...data];
        this.empresas = data.map(empresa => ({
          ...empresa,
          editMode: false
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar empresas';
        this.loading = false;
        console.error(err);
      }
    });
  }

  toggleEditMode(empresa: Empresa & { editMode?: boolean }): void {
    empresa.editMode = true;
  }

  cancelEdit(empresa: Empresa & { editMode?: boolean }, index: number): void {
    // Restaura os dados originais
    const original = this.originalEmpresas[index];
    empresa.cnpj = original.cnpj;
    empresa.nomeFantasia = original.nomeFantasia;
    empresa.cep = original.cep;
    empresa.editMode = false;
  }

  saveInlineEdit(empresa: Empresa): void {
    this.loading = true;
    this.empresaService.update(empresa.id, empresa).subscribe({
      next: (updatedEmpresa) => {
        const index = this.empresas.findIndex(e => e.id === updatedEmpresa.id);
        if (index !== -1) {
          this.empresas[index] = { ...updatedEmpresa, editMode: false };
          this.originalEmpresas[index] = { ...updatedEmpresa };
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao atualizar empresa';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteEmpresa(id: ID): void {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      this.empresaService.delete(id).subscribe({
        next: () => this.loadEmpresas(),
        error: (err) => {
          this.error = 'Erro ao excluir empresa';
          console.error(err);
        }
      });
    }
  }
}
