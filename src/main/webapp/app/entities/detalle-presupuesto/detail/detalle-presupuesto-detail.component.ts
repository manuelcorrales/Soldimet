import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetallePresupuesto } from '../detalle-presupuesto.model';

@Component({
  selector: 'jhi-detalle-presupuesto-detail',
  templateUrl: './detalle-presupuesto-detail.component.html',
})
export class DetallePresupuestoDetailComponent implements OnInit {
  detallePresupuesto: IDetallePresupuesto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detallePresupuesto }) => {
      this.detallePresupuesto = detallePresupuesto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
