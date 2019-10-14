import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { AccountService } from 'app/core/auth/account.service';
import { EstadoCostoRepuestoService } from './estado-costo-repuesto.service';

@Component({
  selector: 'jhi-estado-costo-repuesto',
  templateUrl: './estado-costo-repuesto.component.html'
})
export class EstadoCostoRepuestoComponent implements OnInit, OnDestroy {
  estadoCostoRepuestos: IEstadoCostoRepuesto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estadoCostoRepuestoService: EstadoCostoRepuestoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estadoCostoRepuestoService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstadoCostoRepuesto[]>) => res.ok),
        map((res: HttpResponse<IEstadoCostoRepuesto[]>) => res.body)
      )
      .subscribe(
        (res: IEstadoCostoRepuesto[]) => {
          this.estadoCostoRepuestos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstadoCostoRepuestos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstadoCostoRepuesto) {
    return item.id;
  }

  registerChangeInEstadoCostoRepuestos() {
    this.eventSubscriber = this.eventManager.subscribe('estadoCostoRepuestoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
