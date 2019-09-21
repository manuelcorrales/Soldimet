import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPagoEfectivo } from 'app/shared/model/pago-efectivo.model';
import { AccountService } from 'app/core/auth/account.service';
import { PagoEfectivoService } from './pago-efectivo.service';

@Component({
  selector: 'jhi-pago-efectivo',
  templateUrl: './pago-efectivo.component.html'
})
export class PagoEfectivoComponent implements OnInit, OnDestroy {
  pagoEfectivos: IPagoEfectivo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected pagoEfectivoService: PagoEfectivoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.pagoEfectivoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPagoEfectivo[]>) => res.ok),
        map((res: HttpResponse<IPagoEfectivo[]>) => res.body)
      )
      .subscribe(
        (res: IPagoEfectivo[]) => {
          this.pagoEfectivos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPagoEfectivos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPagoEfectivo) {
    return item.id;
  }

  registerChangeInPagoEfectivos() {
    this.eventSubscriber = this.eventManager.subscribe('pagoEfectivoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
