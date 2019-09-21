import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';

@Component({
  selector: 'jhi-movimiento-presupuesto-detail',
  templateUrl: './movimiento-presupuesto-detail.component.html'
})
export class MovimientoPresupuestoDetailComponent implements OnInit {
  movimientoPresupuesto: IMovimientoPresupuesto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ movimientoPresupuesto }) => {
      this.movimientoPresupuesto = movimientoPresupuesto;
    });
  }

  previousState() {
    window.history.back();
  }
}
