import { ID } from "@datorama/akita";
import { Empresa } from "./Empresa";
import { TipoPessoa } from "./enums/TipoPessoa";

export class Fornecedor{
  id?: ID;
  tipo: TipoPessoa;
  identificador: string;
  nome: string;
  email: string;
  cep: string;
  rg?: string;
  dataNascimento?: Date;
  empresas?: Empresa[];

  constructor(
    id: | ID,
    tipo: TipoPessoa,
    identificador: string,
    nome: string,
    email: string,
    cep: string,
    rg?: string,
    dataNascimento?: Date,
    empresas?: Empresa[]
  ) {
    this.id = id;
    this.tipo = tipo;
    this.identificador = identificador;
    this.nome = nome;
    this.email = email;
    this.cep = cep;
    this.rg = rg;
    this.dataNascimento = dataNascimento;
    this.empresas = empresas;
  }
}
