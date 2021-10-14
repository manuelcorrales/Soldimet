import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovimientoPresupuesto } from '../movimiento-presupuesto.model';

@Component({
  selector: 'jhi-movimiento-presupuesto-detail',
  templateUrl: './movimiento-presupuesto-detail.component.html',
})
export class MovimientoPresupuestoDetailComponent implements OnInit {
  movimientoPresupuesto: IMovimientoPresupuesto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimientoPresupuesto }) => {
      this.movimientoPresupuesto = movimientoPresupuesto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
