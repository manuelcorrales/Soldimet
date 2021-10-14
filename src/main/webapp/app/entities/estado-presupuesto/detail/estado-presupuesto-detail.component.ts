import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoPresupuesto } from '../estado-presupuesto.model';

@Component({
  selector: 'jhi-estado-presupuesto-detail',
  templateUrl: './estado-presupuesto-detail.component.html',
})
export class EstadoPresupuestoDetailComponent implements OnInit {
  estadoPresupuesto: IEstadoPresupuesto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoPresupuesto }) => {
      this.estadoPresupuesto = estadoPresupuesto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
