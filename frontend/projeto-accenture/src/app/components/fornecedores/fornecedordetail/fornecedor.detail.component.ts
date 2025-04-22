import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoPessoa } from 'src/app/modules/enums/TipoPessoa';
import { Fornecedor } from 'src/app/modules/Fornecedor';
import { FornecedorService } from 'src/app/service/FornecedorService';
import { LoadingService } from 'src/app/service/LoadingService';
import { NotificationService } from 'src/app/service/NotificationService';

@Component({
  selector: 'app-fornecedor.detail',
  templateUrl: './fornecedor.detail.component.html',
  styleUrls: ['./fornecedor.detail.component.scss']
})
export class FornecedorDetailComponent {
  fornecedor: Fornecedor | null = null;
  loading = false;
  error: string | null = null;
  tipoPessoa = TipoPessoa;
  activeTab = 'info';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fornecedorService: FornecedorService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFornecedor(+id);
    }
  }

  loadFornecedor(id: number): void {
    this.loading = true;
    this.loadingService.show();

    this.fornecedorService.getEntity(id).subscribe({
      next: (data) => {
        this.fornecedor = data;
        this.loading = false;
        this.loadingService.hide();
      },
      error: (err) => {
        this.error = 'Erro ao carregar detalhes do fornecedor';
        this.loading = false;
        this.loadingService.hide();
        this.notificationService.error(this.error);
        console.error(err);
      }
    });
  }

  editFornecedor(): void {
    if (this.fornecedor) {
      this.router.navigate(['/fornecedores', this.fornecedor.id, 'editar']);
    }
  }

  deleteFornecedor(): void {
    if (!this.fornecedor) return;

    if (confirm(`Tem certeza que deseja excluir o fornecedor "${this.fornecedor.nome}"?`)) {
      this.loadingService.show();

      this.fornecedorService.delete(this.fornecedor.id).subscribe({
        next: () => {
          this.loadingService.hide();
          this.notificationService.success('Fornecedor excluído com sucesso!');
          this.router.navigate(['/fornecedores']);
        },
        error: (err) => {
          this.error = 'Erro ao excluir fornecedor';
          this.loadingService.hide();
          this.notificationService.error(this.error);
          console.error(err);
        }
      });
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getTipoPessoaLabel(tipo: TipoPessoa): string {
    return tipo === TipoPessoa.FISICA ? 'Pessoa Física' : 'Pessoa Jurídica';
  }

  formatDate(date: Date | null): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
