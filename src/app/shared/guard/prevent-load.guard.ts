import {CanLoadFn, CanMatchFn} from "@angular/router";
import {VERIFICAR_ACESSO, VERIFICAR_ACESSO_AUTH} from "./auth.guard";

export const CANLOAD: CanLoadFn = (route, segments) => {
  return VERIFICAR_ACESSO();
}

/*Note: Previne que Bundle de codigo seja carregado se usuario nao tem permissao*/
export const CANMATCH: CanMatchFn = (route, segments) => {

  return VERIFICAR_ACESSO();
}

export const CANMATCH_AUTH = () => {
  return VERIFICAR_ACESSO_AUTH
}



