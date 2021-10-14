import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagoEfectivo } from '../pago-efectivo.model';

@Component({
  selector: 'jhi-pago-efectivo-detail',
  templateUrl: './pago-efectivo-detail.component.html',
})
export class PagoEfectivoDetailComponent implements OnInit {
  pagoEfectivo: IPagoEfectivo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pagoEfectivo }) => {
      this.pagoEfectivo = pagoEfectivo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
