import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';
import { AccountService } from 'app/core/auth/account.service';
import { MedioDePagoTarjetaService } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta.service';

@Component({
  selector: 'jhi-medio-de-pago-tarjeta',
  templateUrl: './medio-de-pago-tarjeta.component.html'
})
export class MedioDePagoTarjetaComponent implements OnInit, OnDestroy {
  medioDePagoTarjetas: IMedioDePagoTarjeta[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected medioDePagoTarjetaService: MedioDePagoTarjetaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.medioDePagoTarjetaService
      .query()
      .pipe(
        filter((res: HttpResponse<IMedioDePagoTarjeta[]>) => res.ok),
        map((res: HttpResponse<IMedioDePagoTarjeta[]>) => res.body)
      )
      .subscribe(
        (res: IMedioDePagoTarjeta[]) => {
          this.medioDePagoTarjetas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMedioDePagoTarjetas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMedioDePagoTarjeta) {
    return item.id;
  }

  registerChangeInMedioDePagoTarjetas() {
    this.eventSubscriber = this.eventManager.subscribe('medioDePagoTarjetaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
