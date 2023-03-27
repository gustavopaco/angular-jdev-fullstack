import { Injectable } from '@angular/core';
import {IndividualConfig, ProgressAnimationType, ToastrService} from "ngx-toastr";

export enum AlertaToastr {
  DANGER = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning"
}


@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  //
  // ngx-toastr
  //
  // type = "error", "success", "info", ""warning
  // maxOpened = 0 libera infinitas mensagens
  //
  message = "";
  title = "";
  typeMessage: string = AlertaToastr.SUCCESS;
  tapToDismiss = true;
  closeButton = false;
  progressBar = true;
  preventDuplicates = false;
  newestOnTop = false;
  progressAnimation: ProgressAnimationType = 'decreasing';
  positionClass = 'toast-top-center';
  maxOpened = 9;

  //===============

  constructor(private toastrService: ToastrService) { }

  successMessage(mensagem: string, titulo?: string, toastPosition?: string) {
    this.setarMensagem(AlertaToastr.SUCCESS, mensagem,titulo,toastPosition);
  }

  errorMessage(mensagem: string, titulo?: string, toastPosition?: string) {
    this.setarMensagem(AlertaToastr.DANGER, mensagem,titulo,toastPosition);
  }

  infoMessage(mensagem: string, titulo?: string, toastPosition?: string) {
    this.setarMensagem(AlertaToastr.INFO, mensagem,titulo,toastPosition);
  }

  warningMessage(mensagem: string, titulo?: string, toastPosition?: string) {
    this.setarMensagem(AlertaToastr.WARNING, mensagem,titulo,toastPosition);
  }

  private setarMensagem(tipoMessagem: string, mensagem: string, titulo?: string, toastPosition?: string) {
    this.typeMessage = tipoMessagem;
    this.message = mensagem;
    titulo ? this.title = titulo : null
    toastPosition ? this.positionClass = toastPosition : null;

    this.showToast()
  }

  private showToast(): void {
    const options: Partial<IndividualConfig> = {
      tapToDismiss: this.tapToDismiss,
      closeButton: this.closeButton,
      progressBar: this.progressBar,
      progressAnimation: this.progressAnimation,
      positionClass: this.positionClass
    };

    // `newestOnTop` and `preventDuplicates` options must be set on global config
    this.toastrService.toastrConfig.newestOnTop = this.newestOnTop;
    this.toastrService.toastrConfig.preventDuplicates = this.preventDuplicates;
    this.toastrService.toastrConfig.maxOpened = this.maxOpened;

    this.toastrService.show(this.message, this.title, options, this.toastrService.toastrConfig.iconClasses[this.typeMessage]);
  }

  clearToasts(): void {
    this.toastrService.clear();
  }

  positionTopLeft(): string {
    return "toast-top-left";
  }
  positionTopCenter(): string {
    return "toast-top-center";
  }
  positionTopRight(): string {
    return "toast-top-right";
  }
}

