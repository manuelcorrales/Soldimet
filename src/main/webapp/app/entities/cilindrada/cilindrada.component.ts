import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Cilindrada } from './cilindrada.model';
import { CilindradaService } from './cilindrada.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-cilindrada',
    templateUrl: './cilindrada.component.html'
})
export class CilindradaComponent implements OnInit, OnDestroy {
cilindradas: Cilindrada[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cilindradaService: CilindradaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cilindradaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cilindradas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCilindradas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Cilindrada) {
        return item.id;
    }
    registerChangeInCilindradas() {
        this.eventSubscriber = this.eventManager.subscribe('cilindradaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
