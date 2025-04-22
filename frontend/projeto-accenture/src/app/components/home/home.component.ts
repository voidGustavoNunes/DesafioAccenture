import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentDate = new Date(2025, 3, 22);

  activeComponent: string | null = null;
  empresaEditando: any = null;
  fornecedorEditando: any = null;

  showComponent(componentName: string): void {
    this.activeComponent = componentName;
    this.empresaEditando = null;
    this.fornecedorEditando = null;
  }

  showEmpresaForm(empresa?: any): void {
    this.activeComponent = 'empresa-form';
    this.empresaEditando = empresa || null;
  }

  showFornecedorForm(fornecedor?: any): void {
    this.activeComponent = 'fornecedor-form';
    this.fornecedorEditando = fornecedor || null;
  }

}
