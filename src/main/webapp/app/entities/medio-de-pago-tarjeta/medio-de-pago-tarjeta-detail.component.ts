import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';

@Component({
  selector: 'jhi-medio-de-pago-tarjeta-detail',
  templateUrl: './medio-de-pago-tarjeta-detail.component.html'
})
export class MedioDePagoTarjetaDetailComponent implements OnInit {
  medioDePagoTarjeta: IMedioDePagoTarjeta;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ medioDePagoTarjeta }) => {
      this.medioDePagoTarjeta = medioDePagoTarjeta;
    });
  }

  previousState() {
    window.history.back();
  }
}
