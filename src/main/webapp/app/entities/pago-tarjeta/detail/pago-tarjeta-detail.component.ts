import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagoTarjeta } from '../pago-tarjeta.model';

@Component({
  selector: 'jhi-pago-tarjeta-detail',
  templateUrl: './pago-tarjeta-detail.component.html',
})
export class PagoTarjetaDetailComponent implements OnInit {
  pagoTarjeta: IPagoTarjeta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pagoTarjeta }) => {
      this.pagoTarjeta = pagoTarjeta;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
