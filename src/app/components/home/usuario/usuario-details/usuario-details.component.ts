import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsuarioService} from "../../../../shared/service/usuario.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: [ '../../../../../assets/css/register.min.css'
  ]
})
export class UsuarioDetailsComponent implements OnInit, OnDestroy{

  pathVariable?: string;
  inscricao: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.getPathVariable();
    this.loadUsuarioById();
  }

  private getPathVariable() {
    this.inscricao.push(this.activatedRoute.params.subscribe(params => this.pathVariable = params['id']))
  }

  private loadUsuarioById() {
    this.inscricao.push(this.usuarioService.getUsuarioById(Number(this.pathVariable)).subscribe({
      next: response => {
        this.usuarioService.getUsuarioEmitter().emit(response)
      }
    }))
  }

  ngOnDestroy(): void {
    this.inscricao.forEach(i => i.unsubscribe());
  }
}
