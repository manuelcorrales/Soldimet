import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';
import { AccountService } from 'app/core/auth/account.service';
import { ListaPrecioDesdeHastaService } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.service';

@Component({
  selector: 'jhi-lista-precio-desde-hasta',
  templateUrl: './lista-precio-desde-hasta.component.html'
})
export class ListaPrecioDesdeHastaComponent implements OnInit, OnDestroy {
  listaPrecioDesdeHastas: IListaPrecioDesdeHasta[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.listaPrecioDesdeHastaService
      .query()
      .pipe(
        filter((res: HttpResponse<IListaPrecioDesdeHasta[]>) => res.ok),
        map((res: HttpResponse<IListaPrecioDesdeHasta[]>) => res.body)
      )
      .subscribe(
        (res: IListaPrecioDesdeHasta[]) => {
          this.listaPrecioDesdeHastas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInListaPrecioDesdeHastas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IListaPrecioDesdeHasta) {
    return item.id;
  }

  registerChangeInListaPrecioDesdeHastas() {
    this.eventSubscriber = this.eventManager.subscribe('listaPrecioDesdeHastaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
