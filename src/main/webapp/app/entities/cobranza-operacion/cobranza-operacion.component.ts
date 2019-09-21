import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';
import { AccountService } from 'app/core/auth/account.service';
import { CobranzaOperacionService } from './cobranza-operacion.service';

@Component({
  selector: 'jhi-cobranza-operacion',
  templateUrl: './cobranza-operacion.component.html'
})
export class CobranzaOperacionComponent implements OnInit, OnDestroy {
  cobranzaOperacions: ICobranzaOperacion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected cobranzaOperacionService: CobranzaOperacionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.cobranzaOperacionService
      .query()
      .pipe(
        filter((res: HttpResponse<ICobranzaOperacion[]>) => res.ok),
        map((res: HttpResponse<ICobranzaOperacion[]>) => res.body)
      )
      .subscribe(
        (res: ICobranzaOperacion[]) => {
          this.cobranzaOperacions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCobranzaOperacions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICobranzaOperacion) {
    return item.id;
  }

  registerChangeInCobranzaOperacions() {
    this.eventSubscriber = this.eventManager.subscribe('cobranzaOperacionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
