import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';

@Component({
  selector: 'jhi-medio-de-pago-cheque-detail',
  templateUrl: './medio-de-pago-cheque-detail.component.html'
})
export class MedioDePagoChequeDetailComponent implements OnInit {
  medioDePagoCheque: IMedioDePagoCheque;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ medioDePagoCheque }) => {
      this.medioDePagoCheque = medioDePagoCheque;
    });
  }

  previousState() {
    window.history.back();
  }
}
