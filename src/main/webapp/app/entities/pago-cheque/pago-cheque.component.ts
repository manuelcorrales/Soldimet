import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPagoCheque } from 'app/shared/model/pago-cheque.model';
import { AccountService } from 'app/core/auth/account.service';
import { PagoChequeService } from 'app/entities/pago-cheque/pago-cheque.service';

@Component({
  selector: 'jhi-pago-cheque',
  templateUrl: './pago-cheque.component.html'
})
export class PagoChequeComponent implements OnInit, OnDestroy {
  pagoCheques: IPagoCheque[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected pagoChequeService: PagoChequeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.pagoChequeService
      .query()
      .pipe(
        filter((res: HttpResponse<IPagoCheque[]>) => res.ok),
        map((res: HttpResponse<IPagoCheque[]>) => res.body)
      )
      .subscribe(
        (res: IPagoCheque[]) => {
          this.pagoCheques = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPagoCheques();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPagoCheque) {
    return item.id;
  }

  registerChangeInPagoCheques() {
    this.eventSubscriber = this.eventManager.subscribe('pagoChequeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
