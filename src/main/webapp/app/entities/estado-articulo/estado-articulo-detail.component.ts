import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';

@Component({
  selector: 'jhi-estado-articulo-detail',
  templateUrl: './estado-articulo-detail.component.html'
})
export class EstadoArticuloDetailComponent implements OnInit {
  estadoArticulo: IEstadoArticulo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoArticulo }) => {
      this.estadoArticulo = estadoArticulo;
    });
  }

  previousState() {
    window.history.back();
  }
}
