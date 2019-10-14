import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOperacion } from 'app/shared/model/operacion.model';
import { AccountService } from 'app/core/auth/account.service';
import { OperacionService } from './operacion.service';

@Component({
  selector: 'jhi-operacion',
  templateUrl: './operacion.component.html'
})
export class OperacionComponent implements OnInit, OnDestroy {
  operacions: IOperacion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected operacionService: OperacionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.operacionService
      .query()
      .pipe(
        filter((res: HttpResponse<IOperacion[]>) => res.ok),
        map((res: HttpResponse<IOperacion[]>) => res.body)
      )
      .subscribe(
        (res: IOperacion[]) => {
          this.operacions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOperacions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOperacion) {
    return item.id;
  }

  registerChangeInOperacions() {
    this.eventSubscriber = this.eventManager.subscribe('operacionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
