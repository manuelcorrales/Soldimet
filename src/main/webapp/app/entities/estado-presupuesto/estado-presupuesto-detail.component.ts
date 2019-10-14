import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';

@Component({
  selector: 'jhi-estado-presupuesto-detail',
  templateUrl: './estado-presupuesto-detail.component.html'
})
export class EstadoPresupuestoDetailComponent implements OnInit {
  estadoPresupuesto: IEstadoPresupuesto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoPresupuesto }) => {
      this.estadoPresupuesto = estadoPresupuesto;
    });
  }

  previousState() {
    window.history.back();
  }
}
