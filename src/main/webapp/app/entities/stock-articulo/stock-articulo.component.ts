import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStockArticulo } from 'app/shared/model/stock-articulo.model';
import { AccountService } from 'app/core/auth/account.service';
import { StockArticuloService } from './stock-articulo.service';

@Component({
  selector: 'jhi-stock-articulo',
  templateUrl: './stock-articulo.component.html'
})
export class StockArticuloComponent implements OnInit, OnDestroy {
  stockArticulos: IStockArticulo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected stockArticuloService: StockArticuloService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.stockArticuloService
      .query()
      .pipe(
        filter((res: HttpResponse<IStockArticulo[]>) => res.ok),
        map((res: HttpResponse<IStockArticulo[]>) => res.body)
      )
      .subscribe(
        (res: IStockArticulo[]) => {
          this.stockArticulos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInStockArticulos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStockArticulo) {
    return item.id;
  }

  registerChangeInStockArticulos() {
    this.eventSubscriber = this.eventManager.subscribe('stockArticuloListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
