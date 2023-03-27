import {Role} from "./Role";
import {Endereco} from "./Endereco";
import {Telefone} from "./Telefone";

export class Usuario {

  id?: number;
  nome?: string;
  username?: string;
  password?: string;
  authorities?: Role[] =[];
  telefones?: Telefone[] = [];
  enderecos?: Endereco[] = [];
  enabled?: boolean;
}
