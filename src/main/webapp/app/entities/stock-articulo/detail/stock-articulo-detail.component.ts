import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStockArticulo } from '../stock-articulo.model';

@Component({
  selector: 'jhi-stock-articulo-detail',
  templateUrl: './stock-articulo-detail.component.html',
})
export class StockArticuloDetailComponent implements OnInit {
  stockArticulo: IStockArticulo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockArticulo }) => {
      this.stockArticulo = stockArticulo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
