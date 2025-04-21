import { ID } from "@datorama/akita";
import { Fornecedor } from "./Fornecedor";

export class Empresa{
  id: ID;
  cnpj: string;
  nomeFantasia: string;
  cep: string;
  fornecedores?: Fornecedor[];

  constructor(
    id: ID,
    cnpj: string,
    nomeFantasia: string,
    cep: string,
    fornecedores?: Fornecedor[]
  ) {
    this.id = id;
    this.cnpj = cnpj;
    this.nomeFantasia = nomeFantasia;
    this.cep = cep;
    this.fornecedores = fornecedores;
  }

}
