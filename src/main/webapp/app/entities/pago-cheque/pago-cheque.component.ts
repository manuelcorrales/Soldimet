import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { PagoCheque } from './pago-cheque.model';
import { PagoChequeService } from './pago-cheque.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-pago-cheque',
    templateUrl: './pago-cheque.component.html'
})
export class PagoChequeComponent implements OnInit, OnDestroy {
pagoCheques: PagoCheque[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pagoChequeService: PagoChequeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pagoChequeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.pagoCheques = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPagoCheques();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PagoCheque) {
        return item.id;
    }
    registerChangeInPagoCheques() {
        this.eventSubscriber = this.eventManager.subscribe('pagoChequeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
