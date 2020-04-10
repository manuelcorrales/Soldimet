import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';
import { AccountService } from 'app/core/auth/account.service';
import { EstadoOperacionService } from 'app/entities/estado-operacion/estado-operacion.service';

@Component({
  selector: 'jhi-estado-operacion',
  templateUrl: './estado-operacion.component.html'
})
export class EstadoOperacionComponent implements OnInit, OnDestroy {
  estadoOperacions: IEstadoOperacion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estadoOperacionService: EstadoOperacionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estadoOperacionService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstadoOperacion[]>) => res.ok),
        map((res: HttpResponse<IEstadoOperacion[]>) => res.body)
      )
      .subscribe(
        (res: IEstadoOperacion[]) => {
          this.estadoOperacions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstadoOperacions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstadoOperacion) {
    return item.id;
  }

  registerChangeInEstadoOperacions() {
    this.eventSubscriber = this.eventManager.subscribe('estadoOperacionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
