import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/modules/Empresa';
import { EmpresaService } from 'src/app/service/EmpresaService';
import { LoadingService } from 'src/app/service/LoadingService';
import { NotificationService } from 'src/app/service/NotificationService';

@Component({
  selector: 'app-empresa.detail',
  templateUrl: './empresa.detail.component.html',
  styleUrls: ['./empresa.detail.component.scss']
})
export class EmpresaDetailComponent implements OnInit{
  empresa: Empresa | null = null;
  loading = false;
  error: string | null = null;
  activeTab = 'info';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmpresa(+id);
    }
  }

  loadEmpresa(id: number): void {
    this.loading = true;
    this.loadingService.show();

    this.empresaService.getEntity(id).subscribe({
      next: (data) => {
        this.empresa = data;
        this.loading = false;
        this.loadingService.hide();
      },
      error: (err) => {
        this.error = 'Erro ao carregar detalhes da empresa';
        this.loading = false;
        this.loadingService.hide();
        this.notificationService.error(this.error);
        console.error(err);
      }
    });
  }

  editEmpresa(): void {
    if (this.empresa) {
      this.router.navigate(['/empresas', this.empresa.id, 'editar']);
    }
  }

  deleteEmpresa(): void {
    if (!this.empresa) return;

    if (confirm(`Tem certeza que deseja excluir a empresa "${this.empresa.nomeFantasia}"?`)) {
      this.loadingService.show();

      this.empresaService.delete(this.empresa.id).subscribe({
        next: () => {
          this.loadingService.hide();
          this.notificationService.success('Empresa excluída com sucesso!');
          this.router.navigate(['/empresas']);
        },
        error: (err) => {
          this.error = 'Erro ao excluir empresa';
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
}
