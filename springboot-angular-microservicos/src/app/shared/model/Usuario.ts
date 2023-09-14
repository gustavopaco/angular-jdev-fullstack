import {Role} from "./Role";
import {Endereco} from "./Endereco";
import {Telefone} from "./Telefone";
import {Profissao} from "./Profissao";

export class Usuario {

  id?: number;
  nome?: string;
  username?: string;
  password?: string;
  cpf?: string;
  salario?: number;
  dataNascimento?: Date;
  profissao: Profissao = new Profissao();
  authorities?: Role[] =[];
  telefones?: Telefone[] = [];
  enderecos?: Endereco[] = [];
  enabled?: boolean;
}
