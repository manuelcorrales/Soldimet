import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { AccountService } from 'app/core/auth/account.service';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto/detalle-presupuesto.service';

@Component({
  selector: 'jhi-detalle-presupuesto',
  templateUrl: './detalle-presupuesto.component.html'
})
export class DetallePresupuestoComponent implements OnInit, OnDestroy {
  detallePresupuestos: IDetallePresupuesto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected detallePresupuestoService: DetallePresupuestoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.detallePresupuestoService
      .query()
      .pipe(
        filter((res: HttpResponse<IDetallePresupuesto[]>) => res.ok),
        map((res: HttpResponse<IDetallePresupuesto[]>) => res.body)
      )
      .subscribe(
        (res: IDetallePresupuesto[]) => {
          this.detallePresupuestos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDetallePresupuestos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDetallePresupuesto) {
    return item.id;
  }

  registerChangeInDetallePresupuestos() {
    this.eventSubscriber = this.eventManager.subscribe('detallePresupuestoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
