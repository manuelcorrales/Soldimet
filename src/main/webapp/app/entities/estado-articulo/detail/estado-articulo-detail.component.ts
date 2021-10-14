import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoArticulo } from '../estado-articulo.model';

@Component({
  selector: 'jhi-estado-articulo-detail',
  templateUrl: './estado-articulo-detail.component.html',
})
export class EstadoArticuloDetailComponent implements OnInit {
  estadoArticulo: IEstadoArticulo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoArticulo }) => {
      this.estadoArticulo = estadoArticulo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
