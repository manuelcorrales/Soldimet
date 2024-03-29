import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { AccountService } from 'app/core/auth/account.service';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.service';

@Component({
  selector: 'jhi-tipo-detalle-movimiento',
  templateUrl: './tipo-detalle-movimiento.component.html'
})
export class TipoDetalleMovimientoComponent implements OnInit, OnDestroy {
  tipoDetalleMovimientos: ITipoDetalleMovimiento[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoDetalleMovimientoService: TipoDetalleMovimientoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoDetalleMovimientoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoDetalleMovimiento[]>) => res.ok),
        map((res: HttpResponse<ITipoDetalleMovimiento[]>) => res.body)
      )
      .subscribe(
        (res: ITipoDetalleMovimiento[]) => {
          this.tipoDetalleMovimientos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoDetalleMovimientos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoDetalleMovimiento) {
    return item.id;
  }

  registerChangeInTipoDetalleMovimientos() {
    this.eventSubscriber = this.eventManager.subscribe('tipoDetalleMovimientoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
