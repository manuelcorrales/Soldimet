import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagoCheque } from '../pago-cheque.model';

@Component({
  selector: 'jhi-pago-cheque-detail',
  templateUrl: './pago-cheque-detail.component.html',
})
export class PagoChequeDetailComponent implements OnInit {
  pagoCheque: IPagoCheque | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pagoCheque }) => {
      this.pagoCheque = pagoCheque;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
