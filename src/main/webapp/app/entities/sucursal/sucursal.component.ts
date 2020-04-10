import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISucursal } from 'app/shared/model/sucursal.model';
import { AccountService } from 'app/core/auth/account.service';
import { SucursalService } from 'app/entities/sucursal/sucursal.service';

@Component({
  selector: 'jhi-sucursal',
  templateUrl: './sucursal.component.html'
})
export class SucursalComponent implements OnInit, OnDestroy {
  sucursals: ISucursal[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sucursalService: SucursalService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sucursalService
      .query()
      .pipe(
        filter((res: HttpResponse<ISucursal[]>) => res.ok),
        map((res: HttpResponse<ISucursal[]>) => res.body)
      )
      .subscribe(
        (res: ISucursal[]) => {
          this.sucursals = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSucursals();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISucursal) {
    return item.id;
  }

  registerChangeInSucursals() {
    this.eventSubscriber = this.eventManager.subscribe('sucursalListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
