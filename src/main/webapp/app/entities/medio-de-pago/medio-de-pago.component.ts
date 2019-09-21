import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedioDePago } from 'app/shared/model/medio-de-pago.model';
import { AccountService } from 'app/core/auth/account.service';
import { MedioDePagoService } from './medio-de-pago.service';

@Component({
  selector: 'jhi-medio-de-pago',
  templateUrl: './medio-de-pago.component.html'
})
export class MedioDePagoComponent implements OnInit, OnDestroy {
  medioDePagos: IMedioDePago[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected medioDePagoService: MedioDePagoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.medioDePagoService
      .query()
      .pipe(
        filter((res: HttpResponse<IMedioDePago[]>) => res.ok),
        map((res: HttpResponse<IMedioDePago[]>) => res.body)
      )
      .subscribe(
        (res: IMedioDePago[]) => {
          this.medioDePagos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMedioDePagos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMedioDePago) {
    return item.id;
  }

  registerChangeInMedioDePagos() {
    this.eventSubscriber = this.eventManager.subscribe('medioDePagoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
