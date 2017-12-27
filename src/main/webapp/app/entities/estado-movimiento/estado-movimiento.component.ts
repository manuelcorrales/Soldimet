import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { EstadoMovimiento } from './estado-movimiento.model';
import { EstadoMovimientoService } from './estado-movimiento.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-estado-movimiento',
    templateUrl: './estado-movimiento.component.html'
})
export class EstadoMovimientoComponent implements OnInit, OnDestroy {
estadoMovimientos: EstadoMovimiento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoMovimientoService: EstadoMovimientoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.estadoMovimientoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.estadoMovimientos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoMovimientos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EstadoMovimiento) {
        return item.id;
    }
    registerChangeInEstadoMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe('estadoMovimientoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
