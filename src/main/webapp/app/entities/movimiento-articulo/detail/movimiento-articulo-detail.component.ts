import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovimientoArticulo } from '../movimiento-articulo.model';

@Component({
  selector: 'jhi-movimiento-articulo-detail',
  templateUrl: './movimiento-articulo-detail.component.html',
})
export class MovimientoArticuloDetailComponent implements OnInit {
  movimientoArticulo: IMovimientoArticulo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimientoArticulo }) => {
      this.movimientoArticulo = movimientoArticulo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
