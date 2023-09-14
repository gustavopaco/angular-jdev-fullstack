import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AlertModalComponent} from "./alert-modal.component";

export enum AlertaBootstrap {
  SUCCESS = "success",
  DANGER = "danger",
  INFO = "info",
  WARNING = "warning",
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalUtilService {

  constructor(private modalService: BsModalService) { }

  private mostrarModalAlerta(message: string, typeMessage: string, autoCloseTimeout?: number) {
    let modalRef: BsModalRef;
    modalRef = this.modalService.show(AlertModalComponent);
    modalRef.content.message = message;
    modalRef.content.typeMessage = typeMessage;

    if (autoCloseTimeout) {
      setTimeout(() => modalRef.hide(), autoCloseTimeout)
    }
  }

  mostrarModalAlertaSuccess(message: string, autoCloseTimeout?: number) {
    this.mostrarModalAlerta(message, AlertaBootstrap.SUCCESS, autoCloseTimeout);
  }
  mostrarModalAlertaDanger(message: string, autoCloseTimeout?: number) {
    this.mostrarModalAlerta(message, AlertaBootstrap.DANGER, autoCloseTimeout);
  }
  mostrarModalAlertaInfo(message: string, autoCloseTimeout?: number) {
    this.mostrarModalAlerta(message, AlertaBootstrap.INFO, autoCloseTimeout);
  }
  mostrarModalAlertaWarning(message: string, autoCloseTimeout?: number) {
    this.mostrarModalAlerta(message, AlertaBootstrap.WARNING, autoCloseTimeout);
  }
}
