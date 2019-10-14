import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';

@Component({
  selector: 'jhi-tipo-detalle-movimiento-detail',
  templateUrl: './tipo-detalle-movimiento-detail.component.html'
})
export class TipoDetalleMovimientoDetailComponent implements OnInit {
  tipoDetalleMovimiento: ITipoDetalleMovimiento;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoDetalleMovimiento }) => {
      this.tipoDetalleMovimiento = tipoDetalleMovimiento;
    });
  }

  previousState() {
    window.history.back();
  }
}
