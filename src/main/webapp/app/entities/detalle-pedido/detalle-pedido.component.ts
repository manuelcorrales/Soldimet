import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDetallePedido } from 'app/shared/model/detalle-pedido.model';
import { AccountService } from 'app/core/auth/account.service';
import { DetallePedidoService } from 'app/entities/detalle-pedido/detalle-pedido.service';

@Component({
  selector: 'jhi-detalle-pedido',
  templateUrl: './detalle-pedido.component.html'
})
export class DetallePedidoComponent implements OnInit, OnDestroy {
  detallePedidos: IDetallePedido[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected detallePedidoService: DetallePedidoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.detallePedidoService
      .query()
      .pipe(
        filter((res: HttpResponse<IDetallePedido[]>) => res.ok),
        map((res: HttpResponse<IDetallePedido[]>) => res.body)
      )
      .subscribe(
        (res: IDetallePedido[]) => {
          this.detallePedidos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDetallePedidos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDetallePedido) {
    return item.id;
  }

  registerChangeInDetallePedidos() {
    this.eventSubscriber = this.eventManager.subscribe('detallePedidoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
