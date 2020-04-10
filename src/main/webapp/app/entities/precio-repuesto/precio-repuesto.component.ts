import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrecioRepuesto } from 'app/shared/model/precio-repuesto.model';
import { AccountService } from 'app/core/auth/account.service';
import { PrecioRepuestoService } from 'app/entities/precio-repuesto/precio-repuesto.service';

@Component({
  selector: 'jhi-precio-repuesto',
  templateUrl: './precio-repuesto.component.html'
})
export class PrecioRepuestoComponent implements OnInit, OnDestroy {
  precioRepuestos: IPrecioRepuesto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected precioRepuestoService: PrecioRepuestoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.precioRepuestoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPrecioRepuesto[]>) => res.ok),
        map((res: HttpResponse<IPrecioRepuesto[]>) => res.body)
      )
      .subscribe(
        (res: IPrecioRepuesto[]) => {
          this.precioRepuestos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPrecioRepuestos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPrecioRepuesto) {
    return item.id;
  }

  registerChangeInPrecioRepuestos() {
    this.eventSubscriber = this.eventManager.subscribe('precioRepuestoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
