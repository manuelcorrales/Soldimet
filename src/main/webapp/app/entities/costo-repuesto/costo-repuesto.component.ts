import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { AccountService } from 'app/core/auth/account.service';
import { CostoRepuestoService } from './costo-repuesto.service';

@Component({
  selector: 'jhi-costo-repuesto',
  templateUrl: './costo-repuesto.component.html'
})
export class CostoRepuestoComponent implements OnInit, OnDestroy {
  costoRepuestos: ICostoRepuesto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected costoRepuestoService: CostoRepuestoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.costoRepuestoService
      .query()
      .pipe(
        filter((res: HttpResponse<ICostoRepuesto[]>) => res.ok),
        map((res: HttpResponse<ICostoRepuesto[]>) => res.body)
      )
      .subscribe(
        (res: ICostoRepuesto[]) => {
          this.costoRepuestos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCostoRepuestos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICostoRepuesto) {
    return item.id;
  }

  registerChangeInCostoRepuestos() {
    this.eventSubscriber = this.eventManager.subscribe('costoRepuestoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
