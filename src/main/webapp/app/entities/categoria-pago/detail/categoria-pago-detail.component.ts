import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoriaPago } from '../categoria-pago.model';

@Component({
  selector: 'jhi-categoria-pago-detail',
  templateUrl: './categoria-pago-detail.component.html',
})
export class CategoriaPagoDetailComponent implements OnInit {
  categoriaPago: ICategoriaPago | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categoriaPago }) => {
      this.categoriaPago = categoriaPago;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
