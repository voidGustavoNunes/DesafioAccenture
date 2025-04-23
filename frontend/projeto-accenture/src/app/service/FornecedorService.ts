import { Fornecedor } from './../modules/Fornecedor';
import { Injectable } from '@angular/core';
import { GenericService } from './GenericService';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends GenericService<Fornecedor, ID>{

  protected override baseUrl = "/api/fornecedor";

  constructor(override httpClient: HttpClient) {
    super(httpClient);
  }
}
