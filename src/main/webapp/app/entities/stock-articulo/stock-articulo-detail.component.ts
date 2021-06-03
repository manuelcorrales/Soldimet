import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStockArticulo } from 'app/shared/model/stock-articulo.model';

@Component({
  selector: 'jhi-stock-articulo-detail',
  templateUrl: './stock-articulo-detail.component.html'
})
export class StockArticuloDetailComponent implements OnInit {
  stockArticulo: IStockArticulo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ stockArticulo }) => {
      this.stockArticulo = stockArticulo;
    });
  }

  previousState() {
    window.history.back();
  }
}
