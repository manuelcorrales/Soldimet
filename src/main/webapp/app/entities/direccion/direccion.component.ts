import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDireccion } from 'app/shared/model/direccion.model';
import { AccountService } from 'app/core/auth/account.service';
import { DireccionService } from 'app/entities/direccion/direccion.service';

@Component({
  selector: 'jhi-direccion',
  templateUrl: './direccion.component.html'
})
export class DireccionComponent implements OnInit, OnDestroy {
  direccions: IDireccion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected direccionService: DireccionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.direccionService
      .query()
      .pipe(
        filter((res: HttpResponse<IDireccion[]>) => res.ok),
        map((res: HttpResponse<IDireccion[]>) => res.body)
      )
      .subscribe(
        (res: IDireccion[]) => {
          this.direccions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDireccions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDireccion) {
    return item.id;
  }

  registerChangeInDireccions() {
    this.eventSubscriber = this.eventManager.subscribe('direccionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
