import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStockArticulo } from '../stock-articulo.model';
import { StockArticuloService } from '../service/stock-articulo.service';
import { StockArticuloDeleteDialogComponent } from '../delete/stock-articulo-delete-dialog.component';

@Component({
  selector: 'jhi-stock-articulo',
  templateUrl: './stock-articulo.component.html',
})
export class StockArticuloComponent implements OnInit {
  stockArticulos?: IStockArticulo[];
  isLoading = false;

  constructor(protected stockArticuloService: StockArticuloService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.stockArticuloService.query().subscribe(
      (res: HttpResponse<IStockArticulo[]>) => {
        this.isLoading = false;
        this.stockArticulos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IStockArticulo): number {
    return item.id!;
  }

  delete(stockArticulo: IStockArticulo): void {
    const modalRef = this.modalService.open(StockArticuloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.stockArticulo = stockArticulo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
