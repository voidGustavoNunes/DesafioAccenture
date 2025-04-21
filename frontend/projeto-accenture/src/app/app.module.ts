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


const routes : Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},

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
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
