import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { FormaDePago } from './forma-de-pago.model';
import { FormaDePagoService } from './forma-de-pago.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-forma-de-pago',
    templateUrl: './forma-de-pago.component.html'
})
export class FormaDePagoComponent implements OnInit, OnDestroy {
formaDePagos: FormaDePago[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private formaDePagoService: FormaDePagoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.formaDePagoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.formaDePagos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFormaDePagos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FormaDePago) {
        return item.id;
    }
    registerChangeInFormaDePagos() {
        this.eventSubscriber = this.eventManager.subscribe('formaDePagoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
