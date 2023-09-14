import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutWithNavComponent } from './layout-with-nav/layout-with-nav.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { NavComponent } from './nav/nav.component';
import { LayoutWithoutNavComponent } from './layout-without-nav/layout-without-nav.component';



@NgModule({
  declarations: [
    LayoutWithNavComponent,
    NavComponent,
    LayoutWithoutNavComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ]
})
export class ContainerModule { }
