import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './GenericService';
import { ID } from '@datorama/akita';
import { Empresa } from '../modules/Empresa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends GenericService<Empresa, ID>{

  protected override baseUrl = "/api/empresa";

    constructor(override httpClient: HttpClient) {
      super(httpClient);
    }

  associarFornecedor(empresaId: ID, fornecedorId: ID): Observable<Empresa> {
    return this.httpClient.post<Empresa>(`${this.baseUrl}/${empresaId}/fornecedores/${fornecedorId}`, {});
  }

  removerFornecedor(empresaId: ID, fornecedorId: ID): Observable<Empresa> {
    return this.httpClient.delete<Empresa>(`${this.baseUrl}/${empresaId}/fornecedores/${fornecedorId}`);
  }
}
