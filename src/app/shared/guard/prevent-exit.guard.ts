import {CanDeactivateFn} from "@angular/router";
import {IformCanDeactivate} from "../interface/iform-can-deactivate";

/*Note: Guarda responsavel por perguntar se usuario realmente deseja sair da Pagina*/
export const FORM_DEACTIVATE_FN: CanDeactivateFn<IformCanDeactivate> =
  (component, route, state, nextState) => {

    return component.canDeactivate();
  }
