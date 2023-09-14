import {Usuario} from "./Usuario";

export class Telefone {
  id?: number;
  numero?: string;
  usuario?: Usuario = new Usuario();
}
