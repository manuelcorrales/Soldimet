import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';
import { AccountService } from 'app/core/auth/account.service';
import { ListaPrecioRectificacionCRAMService } from './lista-precio-rectificacion-cram.service';

@Component({
  selector: 'jhi-lista-precio-rectificacion-cram',
  templateUrl: './lista-precio-rectificacion-cram.component.html'
})
export class ListaPrecioRectificacionCRAMComponent implements OnInit, OnDestroy {
  listaPrecioRectificacionCRAMS: IListaPrecioRectificacionCRAM[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.listaPrecioRectificacionCRAMService
      .query()
      .pipe(
        filter((res: HttpResponse<IListaPrecioRectificacionCRAM[]>) => res.ok),
        map((res: HttpResponse<IListaPrecioRectificacionCRAM[]>) => res.body)
      )
      .subscribe(
        (res: IListaPrecioRectificacionCRAM[]) => {
          this.listaPrecioRectificacionCRAMS = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInListaPrecioRectificacionCRAMS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IListaPrecioRectificacionCRAM) {
    return item.id;
  }

  registerChangeInListaPrecioRectificacionCRAMS() {
    this.eventSubscriber = this.eventManager.subscribe('listaPrecioRectificacionCRAMListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
