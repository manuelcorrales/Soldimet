import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAplicacion } from 'app/shared/model/aplicacion.model';
import { AccountService } from 'app/core/auth/account.service';
import { AplicacionService } from 'app/entities/aplicacion/aplicacion.service';

@Component({
  selector: 'jhi-aplicacion',
  templateUrl: './aplicacion.component.html'
})
export class AplicacionComponent implements OnInit, OnDestroy {
  aplicacions: IAplicacion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected aplicacionService: AplicacionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.aplicacionService
      .query()
      .pipe(
        filter((res: HttpResponse<IAplicacion[]>) => res.ok),
        map((res: HttpResponse<IAplicacion[]>) => res.body)
      )
      .subscribe(
        (res: IAplicacion[]) => {
          this.aplicacions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAplicacions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAplicacion) {
    return item.id;
  }

  registerChangeInAplicacions() {
    this.eventSubscriber = this.eventManager.subscribe('aplicacionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
