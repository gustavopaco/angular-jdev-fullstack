import {Role} from "./role";
import {Telefone} from "./telefone";

export class Usuario {

  id: Number;
  nome: String;
  username: String;
  password: String;
  cpf: String;
  newPassword : String;
  reapeatPassword : String;
  roles : Array<Role> = [];
  telefones : Array<Telefone> = []

  constructor() {
  }

}
