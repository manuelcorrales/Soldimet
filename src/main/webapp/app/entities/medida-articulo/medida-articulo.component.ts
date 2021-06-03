import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';
import { AccountService } from 'app/core/auth/account.service';
import { MedidaArticuloService } from './medida-articulo.service';

@Component({
  selector: 'jhi-medida-articulo',
  templateUrl: './medida-articulo.component.html'
})
export class MedidaArticuloComponent implements OnInit, OnDestroy {
  medidaArticulos: IMedidaArticulo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected medidaArticuloService: MedidaArticuloService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.medidaArticuloService
      .query()
      .pipe(
        filter((res: HttpResponse<IMedidaArticulo[]>) => res.ok),
        map((res: HttpResponse<IMedidaArticulo[]>) => res.body)
      )
      .subscribe(
        (res: IMedidaArticulo[]) => {
          this.medidaArticulos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMedidaArticulos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMedidaArticulo) {
    return item.id;
  }

  registerChangeInMedidaArticulos() {
    this.eventSubscriber = this.eventManager.subscribe('medidaArticuloListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
