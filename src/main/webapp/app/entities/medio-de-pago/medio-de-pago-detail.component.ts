import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedioDePago } from 'app/shared/model/medio-de-pago.model';

@Component({
  selector: 'jhi-medio-de-pago-detail',
  templateUrl: './medio-de-pago-detail.component.html'
})
export class MedioDePagoDetailComponent implements OnInit {
  medioDePago: IMedioDePago;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ medioDePago }) => {
      this.medioDePago = medioDePago;
    });
  }

  previousState() {
    window.history.back();
  }
}
