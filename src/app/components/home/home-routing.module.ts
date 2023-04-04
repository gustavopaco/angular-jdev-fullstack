import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home.component";
import {UsuarioDetailsComponent} from "./usuario/usuario-details/usuario-details.component";
import {UsuarioReportComponent} from "./usuario/usuario-report/usuario-report.component";
import {UsuarioChartComponent} from "./usuario/usuario-chart/usuario-chart.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "edit/:id", component: UsuarioDetailsComponent},
  {path: "report", component: UsuarioReportComponent},
  {path: "chart", component: UsuarioChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
