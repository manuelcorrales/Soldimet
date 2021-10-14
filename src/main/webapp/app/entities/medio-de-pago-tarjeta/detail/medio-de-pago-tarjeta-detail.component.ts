import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedioDePagoTarjeta } from '../medio-de-pago-tarjeta.model';

@Component({
  selector: 'jhi-medio-de-pago-tarjeta-detail',
  templateUrl: './medio-de-pago-tarjeta-detail.component.html',
})
export class MedioDePagoTarjetaDetailComponent implements OnInit {
  medioDePagoTarjeta: IMedioDePagoTarjeta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medioDePagoTarjeta }) => {
      this.medioDePagoTarjeta = medioDePagoTarjeta;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
