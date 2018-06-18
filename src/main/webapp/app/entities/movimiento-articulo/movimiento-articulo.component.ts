import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { MovimientoArticulo } from './movimiento-articulo.model';
import { MovimientoArticuloService } from './movimiento-articulo.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-movimiento-articulo',
    templateUrl: './movimiento-articulo.component.html'
})
export class MovimientoArticuloComponent implements OnInit, OnDestroy {
movimientoArticulos: MovimientoArticulo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private movimientoArticuloService: MovimientoArticuloService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.movimientoArticuloService.query().subscribe(
            (res: ResponseWrapper) => {
                this.movimientoArticulos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMovimientoArticulos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MovimientoArticulo) {
        return item.id;
    }
    registerChangeInMovimientoArticulos() {
        this.eventSubscriber = this.eventManager.subscribe('movimientoArticuloListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
