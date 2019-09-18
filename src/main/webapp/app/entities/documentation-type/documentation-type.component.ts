import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDocumentationType } from 'app/shared/model/documentation-type.model';
import { Principal } from 'app/core';
import { DocumentationTypeService } from 'app/entities/documentation-type/documentation-type.service';

@Component({
    selector: 'jhi-documentation-type',
    templateUrl: './documentation-type.component.html'
})
export class DocumentationTypeComponent implements OnInit, OnDestroy {
    documentationTypes: IDocumentationType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private documentationTypeService: DocumentationTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.documentationTypeService.query().subscribe(
            (res: HttpResponse<IDocumentationType[]>) => {
                this.documentationTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
