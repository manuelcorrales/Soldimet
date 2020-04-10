import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPagoTarjeta } from 'app/shared/model/pago-tarjeta.model';
import { AccountService } from 'app/core/auth/account.service';
import { PagoTarjetaService } from 'app/entities/pago-tarjeta/pago-tarjeta.service';

@Component({
  selector: 'jhi-pago-tarjeta',
  templateUrl: './pago-tarjeta.component.html'
})
export class PagoTarjetaComponent implements OnInit, OnDestroy {
  pagoTarjetas: IPagoTarjeta[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected pagoTarjetaService: PagoTarjetaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.pagoTarjetaService
      .query()
      .pipe(
        filter((res: HttpResponse<IPagoTarjeta[]>) => res.ok),
        map((res: HttpResponse<IPagoTarjeta[]>) => res.body)
      )
      .subscribe(
        (res: IPagoTarjeta[]) => {
          this.pagoTarjetas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPagoTarjetas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPagoTarjeta) {
    return item.id;
  }

  registerChangeInPagoTarjetas() {
    this.eventSubscriber = this.eventManager.subscribe('pagoTarjetaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
