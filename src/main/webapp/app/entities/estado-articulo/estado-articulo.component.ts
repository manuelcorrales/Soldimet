import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { AccountService } from 'app/core/auth/account.service';
import { EstadoArticuloService } from './estado-articulo.service';

@Component({
  selector: 'jhi-estado-articulo',
  templateUrl: './estado-articulo.component.html'
})
export class EstadoArticuloComponent implements OnInit, OnDestroy {
  estadoArticulos: IEstadoArticulo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estadoArticuloService: EstadoArticuloService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estadoArticuloService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstadoArticulo[]>) => res.ok),
        map((res: HttpResponse<IEstadoArticulo[]>) => res.body)
      )
      .subscribe(
        (res: IEstadoArticulo[]) => {
          this.estadoArticulos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstadoArticulos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstadoArticulo) {
    return item.id;
  }

  registerChangeInEstadoArticulos() {
    this.eventSubscriber = this.eventManager.subscribe('estadoArticuloListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
