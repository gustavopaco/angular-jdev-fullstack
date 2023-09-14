import {Component, Injectable, OnInit} from '@angular/core';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {CustomAdapter, FormataData} from "../usuario-add/usuario-add.component";
import {Report} from "../../model/report";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {RelatorioService} from "../../service/relatorio.service";

@Injectable()
export class NormalAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';   /* Delimitador de data */

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0],10),
        month : parseInt(date[1],10),
        year : parseInt(date[2],10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDiaMes(date.day) + this.DELIMITER + validarDiaMes(date.month) + this.DELIMITER + date.year : null;
  }
}

@Injectable()
export class DateFormat extends NgbDateParserFormatter {
  readonly DELIMITER = '/';   /* Delimitador de data */
  format(date: NgbDateStruct | null): string {
    return date ? validarDiaMes(date.day) + this.DELIMITER + validarDiaMes(date.month) + this.DELIMITER + date.year : '';
  }

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0],10),
        month : parseInt(date[1],10),
        year : parseInt(date[2],10)
      };
    }
    return null;
  }
}

function validarDiaMes(valor :any) {
  if (valor !== undefined && valor <= 9) {
    return "0" + valor
  } else {
    return valor;
  }
}

@Component({
  selector: 'app-usuario-report',
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: CustomAdapter},{provide : NgbDateParserFormatter, useClass : FormataData}]
})
export class UsuarioReportComponent implements OnInit {

  report = new Report();
  iframeURL : SafeResourceUrl;
  displayIframe = false;
  selectReport: any[] = [{id: '.pdf', name: 'PDF'}, {id: '.xls', name: 'EXCEL'}];
  selected: String;

  constructor(private relatorioService : RelatorioService, private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
  }

  public printReport() {
    this.relatorioService.advancedReport(this.selected, this.report).subscribe(response => {

      this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl(response);
      this.displayIframe = true;
    }, error => {
      alert(JSON.parse(error.error).message);
    })
  }
}
