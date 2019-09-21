import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { AccountService } from 'app/core/auth/account.service';
import { FormaDePagoService } from './forma-de-pago.service';

@Component({
  selector: 'jhi-forma-de-pago',
  templateUrl: './forma-de-pago.component.html'
})
export class FormaDePagoComponent implements OnInit, OnDestroy {
  formaDePagos: IFormaDePago[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected formaDePagoService: FormaDePagoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.formaDePagoService
      .query()
      .pipe(
        filter((res: HttpResponse<IFormaDePago[]>) => res.ok),
        map((res: HttpResponse<IFormaDePago[]>) => res.body)
      )
      .subscribe(
        (res: IFormaDePago[]) => {
          this.formaDePagos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFormaDePagos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFormaDePago) {
    return item.id;
  }

  registerChangeInFormaDePagos() {
    this.eventSubscriber = this.eventManager.subscribe('formaDePagoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
