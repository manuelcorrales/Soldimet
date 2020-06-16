import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';
import { AccountService } from 'app/core/auth/account.service';
import { CostoRepuestoProveedorService } from './costo-repuesto-proveedor.service';

@Component({
  selector: 'jhi-costo-repuesto-proveedor',
  templateUrl: './costo-repuesto-proveedor.component.html'
})
export class CostoRepuestoProveedorComponent implements OnInit, OnDestroy {
  costoRepuestoProveedors: ICostoRepuestoProveedor[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected costoRepuestoProveedorService: CostoRepuestoProveedorService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.costoRepuestoProveedorService
      .query()
      .pipe(
        filter((res: HttpResponse<ICostoRepuestoProveedor[]>) => res.ok),
        map((res: HttpResponse<ICostoRepuestoProveedor[]>) => res.body)
      )
      .subscribe(
        (res: ICostoRepuestoProveedor[]) => {
          this.costoRepuestoProveedors = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCostoRepuestoProveedors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICostoRepuestoProveedor) {
    return item.id;
  }

  registerChangeInCostoRepuestoProveedors() {
    this.eventSubscriber = this.eventManager.subscribe('costoRepuestoProveedorListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
