import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { AccountService } from 'app/core/auth/account.service';
import { CilindradaService } from './cilindrada.service';

@Component({
  selector: 'jhi-cilindrada',
  templateUrl: './cilindrada.component.html'
})
export class CilindradaComponent implements OnInit, OnDestroy {
  cilindradas: ICilindrada[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected cilindradaService: CilindradaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.cilindradaService
      .query()
      .pipe(
        filter((res: HttpResponse<ICilindrada[]>) => res.ok),
        map((res: HttpResponse<ICilindrada[]>) => res.body)
      )
      .subscribe(
        (res: ICilindrada[]) => {
          this.cilindradas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCilindradas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICilindrada) {
    return item.id;
  }

  registerChangeInCilindradas() {
    this.eventSubscriber = this.eventManager.subscribe('cilindradaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
