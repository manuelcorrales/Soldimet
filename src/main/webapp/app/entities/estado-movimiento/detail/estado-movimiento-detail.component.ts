import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoMovimiento } from '../estado-movimiento.model';

@Component({
  selector: 'jhi-estado-movimiento-detail',
  templateUrl: './estado-movimiento-detail.component.html',
})
export class EstadoMovimientoDetailComponent implements OnInit {
  estadoMovimiento: IEstadoMovimiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoMovimiento }) => {
      this.estadoMovimiento = estadoMovimiento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
