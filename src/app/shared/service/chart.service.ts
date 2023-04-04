import {Injectable} from '@angular/core';
import {ChartConfiguration, ChartData, ChartOptions, ChartType} from "chart.js";
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() {
  }

  getBarChartOptions(): ChartConfiguration['options'] {
    return {
      responsive: true,
      scales: {
        x: {},
        y: {min: 10}
      },
      plugins: {
        legend: {
          display: true,
        },
      }
    };
  }

  getChartPlugins() {
    return [DataLabelsPlugin]
  }

  getChartBarType(): ChartType {
    return 'bar';
  }

  getChartDoughnutType(): ChartType {
    return 'doughnut';
  }

  getChartPieType(): ChartType {
    return 'pie';
  }

  // labels é um ArrayList de String utilizado para colocar a Legenda de cada mes por exemplo no grafico de Barra: 'Janeiro', 'Fevereiro', 'Março'...
  // objetoDados é um objeto com dois atributos:
  // 1- data: number[] -> É um ArrayList de Numeros, literalmente um array de dados
  // 2- label: string -> É uma String que represente o Dado em questao
  createData(objetoDados: any): ChartData {
    let arrayNomes = objetoDados.map((usuarios: any) => usuarios.nome);
    let arraySalario = objetoDados.map((usuarios: any) => usuarios.salario)
    // let arrayNomes = <string[]>objetoDados.nome.split(",", objetoDados.nome.length);
    // let arraySalario = <number[]> objetoDados.salario.split(",", objetoDados.salario.length);
    return {
      labels: arrayNomes,
      datasets: [
        {data: arraySalario, label: 'Salário'}
      ]
    }
  }
}
