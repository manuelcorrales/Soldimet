import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRubro } from 'app/shared/model/rubro.model';
import { AccountService } from 'app/core/auth/account.service';
import { RubroService } from 'app/entities/rubro/rubro.service';

@Component({
  selector: 'jhi-rubro',
  templateUrl: './rubro.component.html'
})
export class RubroComponent implements OnInit, OnDestroy {
  rubros: IRubro[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected rubroService: RubroService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.rubroService
      .query()
      .pipe(
        filter((res: HttpResponse<IRubro[]>) => res.ok),
        map((res: HttpResponse<IRubro[]>) => res.body)
      )
      .subscribe(
        (res: IRubro[]) => {
          this.rubros = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRubros();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRubro) {
    return item.id;
  }

  registerChangeInRubros() {
    this.eventSubscriber = this.eventManager.subscribe('rubroListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
