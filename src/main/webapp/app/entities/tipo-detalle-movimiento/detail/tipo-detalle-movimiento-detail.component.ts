import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoDetalleMovimiento } from '../tipo-detalle-movimiento.model';

@Component({
  selector: 'jhi-tipo-detalle-movimiento-detail',
  templateUrl: './tipo-detalle-movimiento-detail.component.html',
})
export class TipoDetalleMovimientoDetailComponent implements OnInit {
  tipoDetalleMovimiento: ITipoDetalleMovimiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDetalleMovimiento }) => {
      this.tipoDetalleMovimiento = tipoDetalleMovimiento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
