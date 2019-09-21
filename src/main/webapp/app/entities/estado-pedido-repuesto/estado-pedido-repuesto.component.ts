import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';
import { AccountService } from 'app/core/auth/account.service';
import { EstadoPedidoRepuestoService } from './estado-pedido-repuesto.service';

@Component({
  selector: 'jhi-estado-pedido-repuesto',
  templateUrl: './estado-pedido-repuesto.component.html'
})
export class EstadoPedidoRepuestoComponent implements OnInit, OnDestroy {
  estadoPedidoRepuestos: IEstadoPedidoRepuesto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estadoPedidoRepuestoService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstadoPedidoRepuesto[]>) => res.ok),
        map((res: HttpResponse<IEstadoPedidoRepuesto[]>) => res.body)
      )
      .subscribe(
        (res: IEstadoPedidoRepuesto[]) => {
          this.estadoPedidoRepuestos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstadoPedidoRepuestos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstadoPedidoRepuesto) {
    return item.id;
  }

  registerChangeInEstadoPedidoRepuestos() {
    this.eventSubscriber = this.eventManager.subscribe('estadoPedidoRepuestoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
