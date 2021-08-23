import {Role} from "./role";

export class Usuario {

  id: Number;
  nome: String;
  username: String;
  password: String;
  cpf: String;
  newPassword : String;
  reapeatPassword : String;
  roles : Array<Role> = [];


  constructor() {
  }

}
