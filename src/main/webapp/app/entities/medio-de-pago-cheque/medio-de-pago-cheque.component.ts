import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';
import { AccountService } from 'app/core/auth/account.service';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.service';

@Component({
  selector: 'jhi-medio-de-pago-cheque',
  templateUrl: './medio-de-pago-cheque.component.html'
})
export class MedioDePagoChequeComponent implements OnInit, OnDestroy {
  medioDePagoCheques: IMedioDePagoCheque[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected medioDePagoChequeService: MedioDePagoChequeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.medioDePagoChequeService
      .query()
      .pipe(
        filter((res: HttpResponse<IMedioDePagoCheque[]>) => res.ok),
        map((res: HttpResponse<IMedioDePagoCheque[]>) => res.body)
      )
      .subscribe(
        (res: IMedioDePagoCheque[]) => {
          this.medioDePagoCheques = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMedioDePagoCheques();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMedioDePagoCheque) {
    return item.id;
  }

  registerChangeInMedioDePagoCheques() {
    this.eventSubscriber = this.eventManager.subscribe('medioDePagoChequeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
