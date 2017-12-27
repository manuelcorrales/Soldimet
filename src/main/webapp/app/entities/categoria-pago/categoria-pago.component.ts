import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { CategoriaPago } from './categoria-pago.model';
import { CategoriaPagoService } from './categoria-pago.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-categoria-pago',
    templateUrl: './categoria-pago.component.html'
})
export class CategoriaPagoComponent implements OnInit, OnDestroy {
categoriaPagos: CategoriaPago[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private categoriaPagoService: CategoriaPagoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.categoriaPagoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.categoriaPagos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCategoriaPagos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CategoriaPago) {
        return item.id;
    }
    registerChangeInCategoriaPagos() {
        this.eventSubscriber = this.eventManager.subscribe('categoriaPagoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
