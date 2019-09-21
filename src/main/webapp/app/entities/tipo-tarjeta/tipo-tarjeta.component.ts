import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';
import { AccountService } from 'app/core/auth/account.service';
import { TipoTarjetaService } from './tipo-tarjeta.service';

@Component({
  selector: 'jhi-tipo-tarjeta',
  templateUrl: './tipo-tarjeta.component.html'
})
export class TipoTarjetaComponent implements OnInit, OnDestroy {
  tipoTarjetas: ITipoTarjeta[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoTarjetaService: TipoTarjetaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoTarjetaService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoTarjeta[]>) => res.ok),
        map((res: HttpResponse<ITipoTarjeta[]>) => res.body)
      )
      .subscribe(
        (res: ITipoTarjeta[]) => {
          this.tipoTarjetas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoTarjetas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoTarjeta) {
    return item.id;
  }

  registerChangeInTipoTarjetas() {
    this.eventSubscriber = this.eventManager.subscribe('tipoTarjetaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
