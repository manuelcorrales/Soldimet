import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { AccountService } from 'app/core/auth/account.service';
import { TarjetaService } from 'app/entities/tarjeta/tarjeta.service';

@Component({
  selector: 'jhi-tarjeta',
  templateUrl: './tarjeta.component.html'
})
export class TarjetaComponent implements OnInit, OnDestroy {
  tarjetas: ITarjeta[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tarjetaService: TarjetaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tarjetaService
      .query()
      .pipe(
        filter((res: HttpResponse<ITarjeta[]>) => res.ok),
        map((res: HttpResponse<ITarjeta[]>) => res.body)
      )
      .subscribe(
        (res: ITarjeta[]) => {
          this.tarjetas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTarjetas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITarjeta) {
    return item.id;
  }

  registerChangeInTarjetas() {
    this.eventSubscriber = this.eventManager.subscribe('tarjetaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
