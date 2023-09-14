import {Role} from "./role";
import {Telefone} from "./telefone";
import {Profissao} from "./profissao";

export class Usuario {

  id: Number;
  nome: String;
  username: String;
  password: String;
  cpf: String;
  newPassword : String;
  reapeatPassword : String;
  roles : Array<Role> = [];
  telefones : Array<Telefone> = [];
  dataNascimento : String;
  profissao : Profissao =  new Profissao();
  salario : DoubleRange;


}
