import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { AccountService } from 'app/core/auth/account.service';
import { EstadoPresupuestoService } from 'app/entities/estado-presupuesto/estado-presupuesto.service';

@Component({
  selector: 'jhi-estado-presupuesto',
  templateUrl: './estado-presupuesto.component.html'
})
export class EstadoPresupuestoComponent implements OnInit, OnDestroy {
  estadoPresupuestos: IEstadoPresupuesto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estadoPresupuestoService: EstadoPresupuestoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estadoPresupuestoService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstadoPresupuesto[]>) => res.ok),
        map((res: HttpResponse<IEstadoPresupuesto[]>) => res.body)
      )
      .subscribe(
        (res: IEstadoPresupuesto[]) => {
          this.estadoPresupuestos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstadoPresupuestos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstadoPresupuesto) {
    return item.id;
  }

  registerChangeInEstadoPresupuestos() {
    this.eventSubscriber = this.eventManager.subscribe('estadoPresupuestoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
