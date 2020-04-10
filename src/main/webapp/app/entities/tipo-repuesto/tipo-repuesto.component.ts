import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { AccountService } from 'app/core/auth/account.service';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/tipo-repuesto.service';

@Component({
  selector: 'jhi-tipo-repuesto',
  templateUrl: './tipo-repuesto.component.html'
})
export class TipoRepuestoComponent implements OnInit, OnDestroy {
  tipoRepuestos: ITipoRepuesto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoRepuestoService: TipoRepuestoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoRepuestoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoRepuesto[]>) => res.ok),
        map((res: HttpResponse<ITipoRepuesto[]>) => res.body)
      )
      .subscribe(
        (res: ITipoRepuesto[]) => {
          this.tipoRepuestos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoRepuestos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoRepuesto) {
    return item.id;
  }

  registerChangeInTipoRepuestos() {
    this.eventSubscriber = this.eventManager.subscribe('tipoRepuestoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
