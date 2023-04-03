import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormValidator} from "../../../../shared/validator/form-validator";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ReportService} from "../../../../shared/service/report.service";
import {ToastMessageService} from "../../../../shared/external/ngx-toastr/toast-message.service";
import {HttpValidator} from "../../../../shared/validator/http-validator";
import {BsLocaleService} from "ngx-bootstrap/datepicker";
import {defineLocale, ptBrLocale} from "ngx-bootstrap/chronos";
@Component({
  selector: 'app-usuario-report',
  templateUrl: './usuario-report.component.html',
  styles: []
})
export class UsuarioReportComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;
  formularioSubmitted: boolean = false;
  inscricao: Subscription[] = [];

  @ViewChild('iframeComponent') iFrame!: ElementRef;

  constructor(private fb: FormBuilder,
              private reportService: ReportService,
              private toastMessageService: ToastMessageService,
              private localeService: BsLocaleService
  ) {
    ptBrLocale.invalidDate = "Data inválida.";
    defineLocale('pt-br', ptBrLocale);
    localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.generateForm();
  }

  private generateForm() {
    this.formulario = this.fb.group({
      initDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]
    })
  }

  onSubmit() {
    this.formularioSubmitted = true;
    if (this.formulario.valid) {
      this.inscricao.push(this.reportService.advancedParamReport(this.formulario.value).subscribe({
        next: response => {
          this.iFrame.nativeElement.src = response.report;
        },
        error: err => {
          this.toastMessageService.errorMessage(HttpValidator.validateResponseErrorMessage(err))
        }
      }))
    }
  }

  clearIFrame() {
    this.iFrame.nativeElement.src = "";
  }

  openModalOnFormValid(): string {
    return this.formulario.valid ? 'modal' : '';
  }

  validatorInputNgClass(input: string): string {
    return FormValidator.validateInputNgClass(this.formularioSubmitted, <FormControl>this.formulario.get(input));
  }

  validatorSmallGenericMessage(input: string, inputName: string) {
    return FormValidator.validateSmallGenericMessage(<FormControl>this.formulario.get(input), inputName);
  }

  ngOnDestroy(): void {
    this.inscricao.forEach(i => i.unsubscribe());
  }
}
