import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoriaPago } from 'app/shared/model/categoria-pago.model';

@Component({
  selector: 'jhi-categoria-pago-detail',
  templateUrl: './categoria-pago-detail.component.html'
})
export class CategoriaPagoDetailComponent implements OnInit {
  categoriaPago: ICategoriaPago;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ categoriaPago }) => {
      this.categoriaPago = categoriaPago;
    });
  }

  previousState() {
    window.history.back();
  }
}
