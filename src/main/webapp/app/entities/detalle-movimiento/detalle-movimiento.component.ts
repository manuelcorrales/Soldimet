import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';
import { AccountService } from 'app/core/auth/account.service';
import { DetalleMovimientoService } from './detalle-movimiento.service';

@Component({
  selector: 'jhi-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html'
})
export class DetalleMovimientoComponent implements OnInit, OnDestroy {
  detalleMovimientos: IDetalleMovimiento[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected detalleMovimientoService: DetalleMovimientoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.detalleMovimientoService
      .query()
      .pipe(
        filter((res: HttpResponse<IDetalleMovimiento[]>) => res.ok),
        map((res: HttpResponse<IDetalleMovimiento[]>) => res.body)
      )
      .subscribe(
        (res: IDetalleMovimiento[]) => {
          this.detalleMovimientos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDetalleMovimientos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDetalleMovimiento) {
    return item.id;
  }

  registerChangeInDetalleMovimientos() {
    this.eventSubscriber = this.eventManager.subscribe('detalleMovimientoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
