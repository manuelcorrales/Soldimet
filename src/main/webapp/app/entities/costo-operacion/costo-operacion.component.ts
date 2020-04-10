import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';
import { AccountService } from 'app/core/auth/account.service';
import { CostoOperacionService } from 'app/entities/costo-operacion/costo-operacion.service';

@Component({
  selector: 'jhi-costo-operacion',
  templateUrl: './costo-operacion.component.html'
})
export class CostoOperacionComponent implements OnInit, OnDestroy {
  costoOperacions: ICostoOperacion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected costoOperacionService: CostoOperacionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.costoOperacionService
      .query()
      .pipe(
        filter((res: HttpResponse<ICostoOperacion[]>) => res.ok),
        map((res: HttpResponse<ICostoOperacion[]>) => res.body)
      )
      .subscribe(
        (res: ICostoOperacion[]) => {
          this.costoOperacions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCostoOperacions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICostoOperacion) {
    return item.id;
  }

  registerChangeInCostoOperacions() {
    this.eventSubscriber = this.eventManager.subscribe('costoOperacionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
