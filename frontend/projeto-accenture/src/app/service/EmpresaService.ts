import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './GenericService';
import { ID } from '@datorama/akita';
import { Empresa } from '../modules/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends GenericService<Empresa, ID>{

    protected override baseUrl = "http://localhost:8080/api/empresa";

    constructor(override httpClient: HttpClient) {
      super(httpClient);
    }


}
