import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutWithoutNavComponent} from "./container/layout-without-nav/layout-without-nav.component";
import {LayoutWithNavComponent} from "./container/layout-with-nav/layout-with-nav.component";
import {
  IS_USER_LOGGED,
  IS_USER_LOGGED_AUTH,
  IS_USER_LOGGED_CHILD_FN,
  IS_USER_LOGGED_FN_AUTH
} from "./shared/guard/auth.guard";
import {CANMATCH, CANMATCH_AUTH} from "./shared/guard/prevent-load.guard";

const routes: Routes = [
  {path: "home", canMatch: [CANMATCH], canActivate: [IS_USER_LOGGED], canActivateChild: [IS_USER_LOGGED_CHILD_FN] , component: LayoutWithNavComponent, loadChildren: () => import("./components/home/home.module").then(m => m.HomeModule)},
  {path: "auth", canMatch: [CANMATCH_AUTH], canActivate: [IS_USER_LOGGED_AUTH], canActivateChild: [IS_USER_LOGGED_FN_AUTH], component: LayoutWithoutNavComponent, loadChildren: () => import("./components/auth/auth.module").then(m => m.AuthModule)},
  {path: "", redirectTo: "auth", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
