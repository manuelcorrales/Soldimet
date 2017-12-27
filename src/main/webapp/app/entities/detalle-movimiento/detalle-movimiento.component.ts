import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { DetalleMovimiento } from './detalle-movimiento.model';
import { DetalleMovimientoService } from './detalle-movimiento.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-detalle-movimiento',
    templateUrl: './detalle-movimiento.component.html'
})
export class DetalleMovimientoComponent implements OnInit, OnDestroy {
detalleMovimientos: DetalleMovimiento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private detalleMovimientoService: DetalleMovimientoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.detalleMovimientoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.detalleMovimientos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDetalleMovimientos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DetalleMovimiento) {
        return item.id;
    }
    registerChangeInDetalleMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe('detalleMovimientoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
