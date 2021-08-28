import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import {UsuarioService} from "../../service/usuario.service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Salary'}
  ];

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.dataChart()
  }

  public dataChart() {
    this.usuarioService.dataChart().subscribe(response => {
      let arrayBC : Array<string> = []
      let arrayHBC : Array<string> = []

      for (let i = 0; i < response.nome.length; i++) {
          arrayBC.push('rgb(6,38,245)');
          arrayHBC.push('rgb(0,212,36)');
      }

      this.barChartLabels = response.nome;
      this.barChartData[0].data = response.salario;
      this.barChartData[0].backgroundColor = arrayBC;
      this.barChartData[0].hoverBackgroundColor = arrayHBC;

    }, error => { alert(error.error)})
  }
}
