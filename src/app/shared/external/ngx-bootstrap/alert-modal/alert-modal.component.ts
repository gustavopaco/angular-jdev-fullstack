import {Component, Input} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: [ '../../../../../assets/css/pagina-inicial.min.css'
  ]
})
export class AlertModalComponent {

  @Input() message?: string;
  @Input() typeMessage?: string;

  constructor(public bsModalRef: BsModalRef) {
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
