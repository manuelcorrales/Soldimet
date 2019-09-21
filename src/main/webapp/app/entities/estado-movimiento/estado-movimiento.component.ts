import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { AccountService } from 'app/core/auth/account.service';
import { EstadoMovimientoService } from './estado-movimiento.service';

@Component({
  selector: 'jhi-estado-movimiento',
  templateUrl: './estado-movimiento.component.html'
})
export class EstadoMovimientoComponent implements OnInit, OnDestroy {
  estadoMovimientos: IEstadoMovimiento[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estadoMovimientoService: EstadoMovimientoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estadoMovimientoService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstadoMovimiento[]>) => res.ok),
        map((res: HttpResponse<IEstadoMovimiento[]>) => res.body)
      )
      .subscribe(
        (res: IEstadoMovimiento[]) => {
          this.estadoMovimientos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstadoMovimientos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstadoMovimiento) {
    return item.id;
  }

  registerChangeInEstadoMovimientos() {
    this.eventSubscriber = this.eventManager.subscribe('estadoMovimientoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
