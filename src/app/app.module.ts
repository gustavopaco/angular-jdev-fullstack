import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {HttpInterceptorModule} from "./service/header-interceptor.service";


  /*IMPORTANT: Devinindo paths para redirecionamento de pagina, baseada em componentes */
export const appRouters : Routes = [
  {path : "home", component : HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "", component: LoginComponent}
]

  /* IMPORTANT: Exportando para dentro do app.Module o Array de Rotas URI do sistema */
export const routes : ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRouters);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    routes,
    HttpInterceptorModule,
    HttpClientModule, /*IMPORTANT: Modulo de realizar requisicoes AJAX */
    ReactiveFormsModule,
    FormsModule /* Modulo de formulario para bindar objetos */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
