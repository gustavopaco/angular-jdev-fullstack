import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home.component";
import {UsuarioDetailsComponent} from "./usuario/usuario-details/usuario-details.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "edit/:id", component: UsuarioDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
