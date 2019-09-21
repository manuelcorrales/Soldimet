import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';
import { AccountService } from 'app/core/auth/account.service';
import { EstadoCobranzaOperacionService } from './estado-cobranza-operacion.service';

@Component({
  selector: 'jhi-estado-cobranza-operacion',
  templateUrl: './estado-cobranza-operacion.component.html'
})
export class EstadoCobranzaOperacionComponent implements OnInit, OnDestroy {
  estadoCobranzaOperacions: IEstadoCobranzaOperacion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estadoCobranzaOperacionService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstadoCobranzaOperacion[]>) => res.ok),
        map((res: HttpResponse<IEstadoCobranzaOperacion[]>) => res.body)
      )
      .subscribe(
        (res: IEstadoCobranzaOperacion[]) => {
          this.estadoCobranzaOperacions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstadoCobranzaOperacions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstadoCobranzaOperacion) {
    return item.id;
  }

  registerChangeInEstadoCobranzaOperacions() {
    this.eventSubscriber = this.eventManager.subscribe('estadoCobranzaOperacionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
