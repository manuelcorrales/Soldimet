import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { HistorialPrecio } from './historial-precio.model';
import { HistorialPrecioService } from './historial-precio.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-historial-precio',
    templateUrl: './historial-precio.component.html'
})
export class HistorialPrecioComponent implements OnInit, OnDestroy {
historialPrecios: HistorialPrecio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private historialPrecioService: HistorialPrecioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.historialPrecioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.historialPrecios = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInHistorialPrecios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: HistorialPrecio) {
        return item.id;
    }
    registerChangeInHistorialPrecios() {
        this.eventSubscriber = this.eventManager.subscribe('historialPrecioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
