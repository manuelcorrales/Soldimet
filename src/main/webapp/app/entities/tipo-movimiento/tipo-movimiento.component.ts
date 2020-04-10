import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { AccountService } from 'app/core/auth/account.service';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento/tipo-movimiento.service';

@Component({
  selector: 'jhi-tipo-movimiento',
  templateUrl: './tipo-movimiento.component.html'
})
export class TipoMovimientoComponent implements OnInit, OnDestroy {
  tipoMovimientos: ITipoMovimiento[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoMovimientoService: TipoMovimientoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoMovimientoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoMovimiento[]>) => res.ok),
        map((res: HttpResponse<ITipoMovimiento[]>) => res.body)
      )
      .subscribe(
        (res: ITipoMovimiento[]) => {
          this.tipoMovimientos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoMovimientos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoMovimiento) {
    return item.id;
  }

  registerChangeInTipoMovimientos() {
    this.eventSubscriber = this.eventManager.subscribe('tipoMovimientoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
