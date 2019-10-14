import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMovimientoPedido } from 'app/shared/model/movimiento-pedido.model';
import { AccountService } from 'app/core/auth/account.service';
import { MovimientoPedidoService } from './movimiento-pedido.service';

@Component({
  selector: 'jhi-movimiento-pedido',
  templateUrl: './movimiento-pedido.component.html'
})
export class MovimientoPedidoComponent implements OnInit, OnDestroy {
  movimientoPedidos: IMovimientoPedido[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected movimientoPedidoService: MovimientoPedidoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.movimientoPedidoService
      .query()
      .pipe(
        filter((res: HttpResponse<IMovimientoPedido[]>) => res.ok),
        map((res: HttpResponse<IMovimientoPedido[]>) => res.body)
      )
      .subscribe(
        (res: IMovimientoPedido[]) => {
          this.movimientoPedidos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMovimientoPedidos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMovimientoPedido) {
    return item.id;
  }

  registerChangeInMovimientoPedidos() {
    this.eventSubscriber = this.eventManager.subscribe('movimientoPedidoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
