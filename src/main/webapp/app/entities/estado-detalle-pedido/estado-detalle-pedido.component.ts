import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';
import { AccountService } from 'app/core/auth/account.service';
import { EstadoDetallePedidoService } from './estado-detalle-pedido.service';

@Component({
  selector: 'jhi-estado-detalle-pedido',
  templateUrl: './estado-detalle-pedido.component.html'
})
export class EstadoDetallePedidoComponent implements OnInit, OnDestroy {
  estadoDetallePedidos: IEstadoDetallePedido[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estadoDetallePedidoService: EstadoDetallePedidoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estadoDetallePedidoService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstadoDetallePedido[]>) => res.ok),
        map((res: HttpResponse<IEstadoDetallePedido[]>) => res.body)
      )
      .subscribe(
        (res: IEstadoDetallePedido[]) => {
          this.estadoDetallePedidos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstadoDetallePedidos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstadoDetallePedido) {
    return item.id;
  }

  registerChangeInEstadoDetallePedidos() {
    this.eventSubscriber = this.eventManager.subscribe('estadoDetallePedidoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
