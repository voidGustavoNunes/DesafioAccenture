import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmpresaFormComponent } from './components/empresas/empresaform/empresa.form.component';
import { EmpresaListComponent } from './components/empresas/empresalist/empresa.list.component';
import { FornecedorListComponent } from './components/fornecedores/fornecedorlist/fornecedor.list.component';
import { ToasterComponent } from './shared/toaster/toaster.component';
import { FornecedorFormComponent } from './components/fornecedores/fornecedorform/fornecedor.form.component';
import { HomeComponent } from './components/home/home.component';
import { AssociacaoComponent } from './components/associacao/associacao.component';
import { RouterModule, Routes } from '@angular/router';
import { CpfMaskDirective } from './components/directives/cpf-mask.directive';
import { CnpjMaskDirective } from './components/directives/cnpj-mask.directive';
import { CepMaskDirective } from './components/directives/cep-mask.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './shared/notification/notification.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { EmpresaDetailComponent } from './components/empresas/empresadetail/empresa.detail.component';
import { FornecedorDetailComponent } from './components/fornecedores/fornecedor.detail/fornecedor.detail.component';
import { HttpClientModule } from '@angular/common/http';


const routes : Routes = [
  { path: '', component: HomeComponent },

  // Rotas de Empresa
  { path: 'empresas', component: EmpresaListComponent },
  { path: 'empresas/novo', component: EmpresaFormComponent },
  { path: 'empresas/:id', component: EmpresaDetailComponent },
  { path: 'empresas/:id/editar', component: EmpresaFormComponent },

  { path: 'fornecedores', component: FornecedorListComponent },
  { path: 'fornecedores/novo', component: FornecedorFormComponent },
  { path: 'fornecedores/:id', component: FornecedorDetailComponent },
  { path: 'fornecedores/:id/editar', component: FornecedorFormComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    EmpresaListComponent,
    FornecedorListComponent,
    ToasterComponent,
    EmpresaFormComponent,
    FornecedorFormComponent,
    HomeComponent,
    AssociacaoComponent,
    CpfMaskDirective,
    CnpjMaskDirective,
    CepMaskDirective,
    NotificationComponent,
    LoadingComponent,
    EmpresaDetailComponent,
    FornecedorDetailComponent,

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
