import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';
import { AccountService } from 'app/core/auth/account.service';
import { MovimientoArticuloService } from './movimiento-articulo.service';

@Component({
  selector: 'jhi-movimiento-articulo',
  templateUrl: './movimiento-articulo.component.html'
})
export class MovimientoArticuloComponent implements OnInit, OnDestroy {
  movimientoArticulos: IMovimientoArticulo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected movimientoArticuloService: MovimientoArticuloService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.movimientoArticuloService
      .query()
      .pipe(
        filter((res: HttpResponse<IMovimientoArticulo[]>) => res.ok),
        map((res: HttpResponse<IMovimientoArticulo[]>) => res.body)
      )
      .subscribe(
        (res: IMovimientoArticulo[]) => {
          this.movimientoArticulos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMovimientoArticulos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMovimientoArticulo) {
    return item.id;
  }

  registerChangeInMovimientoArticulos() {
    this.eventSubscriber = this.eventManager.subscribe('movimientoArticuloListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
