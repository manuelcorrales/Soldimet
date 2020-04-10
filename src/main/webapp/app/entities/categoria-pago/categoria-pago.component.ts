import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICategoriaPago } from 'app/shared/model/categoria-pago.model';
import { AccountService } from 'app/core/auth/account.service';
import { CategoriaPagoService } from 'app/entities/categoria-pago/categoria-pago.service';

@Component({
  selector: 'jhi-categoria-pago',
  templateUrl: './categoria-pago.component.html'
})
export class CategoriaPagoComponent implements OnInit, OnDestroy {
  categoriaPagos: ICategoriaPago[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected categoriaPagoService: CategoriaPagoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.categoriaPagoService
      .query()
      .pipe(
        filter((res: HttpResponse<ICategoriaPago[]>) => res.ok),
        map((res: HttpResponse<ICategoriaPago[]>) => res.body)
      )
      .subscribe(
        (res: ICategoriaPago[]) => {
          this.categoriaPagos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCategoriaPagos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICategoriaPago) {
    return item.id;
  }

  registerChangeInCategoriaPagos() {
    this.eventSubscriber = this.eventManager.subscribe('categoriaPagoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
