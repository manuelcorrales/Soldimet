import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBanco } from 'app/shared/model/banco.model';
import { AccountService } from 'app/core/auth/account.service';
import { BancoService } from './banco.service';

@Component({
  selector: 'jhi-banco',
  templateUrl: './banco.component.html'
})
export class BancoComponent implements OnInit, OnDestroy {
  bancos: IBanco[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected bancoService: BancoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.bancoService
      .query()
      .pipe(
        filter((res: HttpResponse<IBanco[]>) => res.ok),
        map((res: HttpResponse<IBanco[]>) => res.body)
      )
      .subscribe(
        (res: IBanco[]) => {
          this.bancos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBancos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBanco) {
    return item.id;
  }

  registerChangeInBancos() {
    this.eventSubscriber = this.eventManager.subscribe('bancoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
