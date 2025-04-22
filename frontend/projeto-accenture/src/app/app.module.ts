import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssociacaoComponent } from './components/associacao/associacao.component';
import { BoasVindasComponent } from './components/boas-vindas/boas-vindas.component';
import { CepMaskDirective } from './components/directives/cep-mask.directive';
import { CnpjMaskDirective } from './components/directives/cnpj-mask.directive';
import { CpfMaskDirective } from './components/directives/cpf-mask.directive';
import { EmpresaDetailComponent } from './components/empresas/empresadetail/empresa.detail.component';
import { EmpresaFormComponent } from './components/empresas/empresaform/empresa.form.component';
import { EmpresaListComponent } from './components/empresas/empresalist/empresa.list.component';
import { FornecedorDetailComponent } from './components/fornecedores/fornecedordetail/fornecedor.detail.component';
import { FornecedorFormComponent } from './components/fornecedores/fornecedorform/fornecedor.form.component';
import { FornecedorListComponent } from './components/fornecedores/fornecedorlist/fornecedor.list.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { ToasterComponent } from './shared/toaster/toaster.component';


const routes : Routes = [
  { path: '', component: BoasVindasComponent },

  // Rotas de Empresa
  { path: 'empresas', component: EmpresaListComponent },
  { path: 'empresas/novo', component: EmpresaFormComponent },
  { path: 'empresas/:id', component: EmpresaDetailComponent },
  { path: 'empresas/:id/editar', component: EmpresaFormComponent },

  { path: 'fornecedores', component: FornecedorListComponent },
  { path: 'fornecedores/novo', component: FornecedorFormComponent },
  { path: 'fornecedores/:id', component: FornecedorDetailComponent },
  { path: 'fornecedores/:id/editar', component: FornecedorFormComponent },
  { path: 'home', component: EmpresaListComponent },

  { path: '**', component: BoasVindasComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EmpresaListComponent,
    FornecedorListComponent,
    ToasterComponent,
    EmpresaFormComponent,
    FornecedorFormComponent,
    AssociacaoComponent,
    CpfMaskDirective,
    CnpjMaskDirective,
    CepMaskDirective,
    NotificationComponent,
    LoadingComponent,
    EmpresaDetailComponent,
    FornecedorDetailComponent,
    BoasVindasComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
