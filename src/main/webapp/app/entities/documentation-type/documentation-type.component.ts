import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDocumentationType } from 'app/shared/model/documentation-type.model';
import { AccountService } from 'app/core/auth/account.service';
import { DocumentationTypeService } from './documentation-type.service';

@Component({
  selector: 'jhi-documentation-type',
  templateUrl: './documentation-type.component.html'
})
export class DocumentationTypeComponent implements OnInit, OnDestroy {
  documentationTypes: IDocumentationType[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected documentationTypeService: DocumentationTypeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.documentationTypeService
      .query()
      .pipe(
        filter((res: HttpResponse<IDocumentationType[]>) => res.ok),
        map((res: HttpResponse<IDocumentationType[]>) => res.body)
      )
      .subscribe(
        (res: IDocumentationType[]) => {
          this.documentationTypes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDocumentationTypes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDocumentationType) {
    return item.id;
  }

  registerChangeInDocumentationTypes() {
    this.eventSubscriber = this.eventManager.subscribe('documentationTypeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
