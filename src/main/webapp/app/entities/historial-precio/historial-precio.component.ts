import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHistorialPrecio } from 'app/shared/model/historial-precio.model';
import { AccountService } from 'app/core/auth/account.service';
import { HistorialPrecioService } from 'app/entities/historial-precio/historial-precio.service';

@Component({
  selector: 'jhi-historial-precio',
  templateUrl: './historial-precio.component.html'
})
export class HistorialPrecioComponent implements OnInit, OnDestroy {
  historialPrecios: IHistorialPrecio[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected historialPrecioService: HistorialPrecioService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.historialPrecioService
      .query()
      .pipe(
        filter((res: HttpResponse<IHistorialPrecio[]>) => res.ok),
        map((res: HttpResponse<IHistorialPrecio[]>) => res.body)
      )
      .subscribe(
        (res: IHistorialPrecio[]) => {
          this.historialPrecios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInHistorialPrecios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IHistorialPrecio) {
    return item.id;
  }

  registerChangeInHistorialPrecios() {
    this.eventSubscriber = this.eventManager.subscribe('historialPrecioListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
