import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { AccountService } from 'app/core/auth/account.service';
import { CobranzaRepuestoService } from 'app/entities/cobranza-repuesto/cobranza-repuesto.service';

@Component({
  selector: 'jhi-cobranza-repuesto',
  templateUrl: './cobranza-repuesto.component.html'
})
export class CobranzaRepuestoComponent implements OnInit, OnDestroy {
  cobranzaRepuestos: ICobranzaRepuesto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected cobranzaRepuestoService: CobranzaRepuestoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.cobranzaRepuestoService
      .query()
      .pipe(
        filter((res: HttpResponse<ICobranzaRepuesto[]>) => res.ok),
        map((res: HttpResponse<ICobranzaRepuesto[]>) => res.body)
      )
      .subscribe(
        (res: ICobranzaRepuesto[]) => {
          this.cobranzaRepuestos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCobranzaRepuestos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICobranzaRepuesto) {
    return item.id;
  }

  registerChangeInCobranzaRepuestos() {
    this.eventSubscriber = this.eventManager.subscribe('cobranzaRepuestoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
