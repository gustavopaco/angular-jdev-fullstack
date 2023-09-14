import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartService} from "../../../../shared/service/chart.service";
import {Subscription} from "rxjs";
import {UsuarioService} from "../../../../shared/service/usuario.service";
import {ToastMessageService} from "../../../../shared/external/ngx-toastr/toast-message.service";
import {ChartData} from "chart.js";

@Component({
  selector: 'app-usuario-chart',
  templateUrl: './usuario-chart.component.html',
  styles: [
  ]
})
export class UsuarioChartComponent implements OnInit, OnDestroy{

  chartDataResult?: ChartData

  inscricao: Subscription[] = []

  constructor(private chartService: ChartService,
              private usuarioService: UsuarioService,
              private toastMessageService: ToastMessageService) {
  }

  ngOnInit(): void {
    this.generateBarChart()
  }

  private generateBarChart() {
    this.inscricao.push(this.usuarioService.generateChart().subscribe({
      next: response => {
        this.chartDataResult = this.chartService.createData(response);
      }
    }))
  }
  chartOptions() {
    return this.chartService.getBarChartOptions();
  }
  chartPlugins() {
    return this.chartService.getChartPlugins()
  }

  chartBarType() {
    return this.chartService.getChartBarType()
  }

  chartDoughnutType() {
    return this.chartService.getChartDoughnutType();
  }

  chartPieType() {
    return this.chartService.getChartPieType();
  }

  chartData(objetoDados?: any) {
    return this.chartService.createData(objetoDados)
  }
  ngOnDestroy(): void {
    this.inscricao.forEach(i => i.unsubscribe());
  }
}
