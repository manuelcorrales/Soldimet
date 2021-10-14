import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetallMovimiento } from '../detall-movimiento.model';

@Component({
  selector: 'jhi-detall-movimiento-detail',
  templateUrl: './detall-movimiento-detail.component.html',
})
export class DetallMovimientoDetailComponent implements OnInit {
  detallMovimiento: IDetallMovimiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detallMovimiento }) => {
      this.detallMovimiento = detallMovimiento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
