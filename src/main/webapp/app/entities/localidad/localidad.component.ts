import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILocalidad } from 'app/shared/model/localidad.model';
import { AccountService } from 'app/core/auth/account.service';
import { LocalidadService } from './localidad.service';

@Component({
  selector: 'jhi-localidad',
  templateUrl: './localidad.component.html'
})
export class LocalidadComponent implements OnInit, OnDestroy {
  localidads: ILocalidad[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected localidadService: LocalidadService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.localidadService
      .query()
      .pipe(
        filter((res: HttpResponse<ILocalidad[]>) => res.ok),
        map((res: HttpResponse<ILocalidad[]>) => res.body)
      )
      .subscribe(
        (res: ILocalidad[]) => {
          this.localidads = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLocalidads();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILocalidad) {
    return item.id;
  }

  registerChangeInLocalidads() {
    this.eventSubscriber = this.eventManager.subscribe('localidadListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
