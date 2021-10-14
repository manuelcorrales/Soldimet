import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoMovimiento } from '../tipo-movimiento.model';

@Component({
  selector: 'jhi-tipo-movimiento-detail',
  templateUrl: './tipo-movimiento-detail.component.html',
})
export class TipoMovimientoDetailComponent implements OnInit {
  tipoMovimiento: ITipoMovimiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoMovimiento }) => {
      this.tipoMovimiento = tipoMovimiento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
