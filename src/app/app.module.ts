import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {UsuarioComponent} from "./components/usuario/usuario.component";
import {HeaderInterceptorService} from "./service/header-interceptor.service";


/*IMPORTANT: Devinindo paths para redirecionamento de pagina, baseada em componentes */
export const appRouters : Routes = [
  {path : "", component : LoginComponent},
  {path : "login", component : LoginComponent},
  {path : "home", component : HomeComponent},
  {path : "showusers", component : UsuarioComponent}
]

  /* IMPORTANT: Exportando para dentro do app.Module o Array de Rotas URI do sistema */
export const routes : ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRouters);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    routes,
    HttpClientModule, /*IMPORTANT: Modulo de realizar requisicoes AJAX */
    ReactiveFormsModule,
    FormsModule /* Modulo de formulario para bindar objetos */
  ],
  providers: [{ provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

