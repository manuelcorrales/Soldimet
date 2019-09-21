import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';
import { AccountService } from 'app/core/auth/account.service';
import { MovimientoPresupuestoService } from './movimiento-presupuesto.service';

@Component({
  selector: 'jhi-movimiento-presupuesto',
  templateUrl: './movimiento-presupuesto.component.html'
})
export class MovimientoPresupuestoComponent implements OnInit, OnDestroy {
  movimientoPresupuestos: IMovimientoPresupuesto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected movimientoPresupuestoService: MovimientoPresupuestoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.movimientoPresupuestoService
      .query()
      .pipe(
        filter((res: HttpResponse<IMovimientoPresupuesto[]>) => res.ok),
        map((res: HttpResponse<IMovimientoPresupuesto[]>) => res.body)
      )
      .subscribe(
        (res: IMovimientoPresupuesto[]) => {
          this.movimientoPresupuestos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMovimientoPresupuestos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMovimientoPresupuesto) {
    return item.id;
  }

  registerChangeInMovimientoPresupuestos() {
    this.eventSubscriber = this.eventManager.subscribe('movimientoPresupuestoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
