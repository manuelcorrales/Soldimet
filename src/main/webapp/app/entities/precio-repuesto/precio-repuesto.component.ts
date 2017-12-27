import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { PrecioRepuesto } from './precio-repuesto.model';
import { PrecioRepuestoService } from './precio-repuesto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-precio-repuesto',
    templateUrl: './precio-repuesto.component.html'
})
export class PrecioRepuestoComponent implements OnInit, OnDestroy {
precioRepuestos: PrecioRepuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private precioRepuestoService: PrecioRepuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.precioRepuestoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.precioRepuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPrecioRepuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PrecioRepuesto) {
        return item.id;
    }
    registerChangeInPrecioRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe('precioRepuestoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
