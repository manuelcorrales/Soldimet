import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedioDePagoCheque } from '../medio-de-pago-cheque.model';

@Component({
  selector: 'jhi-medio-de-pago-cheque-detail',
  templateUrl: './medio-de-pago-cheque-detail.component.html',
})
export class MedioDePagoChequeDetailComponent implements OnInit {
  medioDePagoCheque: IMedioDePagoCheque | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medioDePagoCheque }) => {
      this.medioDePagoCheque = medioDePagoCheque;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
