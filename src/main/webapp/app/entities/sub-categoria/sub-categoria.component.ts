import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISubCategoria } from 'app/shared/model/sub-categoria.model';
import { AccountService } from 'app/core/auth/account.service';
import { SubCategoriaService } from 'app/entities/sub-categoria/sub-categoria.service';

@Component({
  selector: 'jhi-sub-categoria',
  templateUrl: './sub-categoria.component.html'
})
export class SubCategoriaComponent implements OnInit, OnDestroy {
  subCategorias: ISubCategoria[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected subCategoriaService: SubCategoriaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.subCategoriaService
      .query()
      .pipe(
        filter((res: HttpResponse<ISubCategoria[]>) => res.ok),
        map((res: HttpResponse<ISubCategoria[]>) => res.body)
      )
      .subscribe(
        (res: ISubCategoria[]) => {
          this.subCategorias = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSubCategorias();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISubCategoria) {
    return item.id;
  }

  registerChangeInSubCategorias() {
    this.eventSubscriber = this.eventManager.subscribe('subCategoriaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
