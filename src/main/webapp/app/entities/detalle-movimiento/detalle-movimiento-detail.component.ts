import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';

@Component({
  selector: 'jhi-detalle-movimiento-detail',
  templateUrl: './detalle-movimiento-detail.component.html'
})
export class DetalleMovimientoDetailComponent implements OnInit {
  detalleMovimiento: IDetalleMovimiento;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detalleMovimiento }) => {
      this.detalleMovimiento = detalleMovimiento;
    });
  }

  previousState() {
    window.history.back();
  }
}
