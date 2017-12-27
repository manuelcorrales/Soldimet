import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { TipoDetalleMovimiento } from './tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from './tipo-detalle-movimiento.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tipo-detalle-movimiento',
    templateUrl: './tipo-detalle-movimiento.component.html'
})
export class TipoDetalleMovimientoComponent implements OnInit, OnDestroy {
tipoDetalleMovimientos: TipoDetalleMovimiento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoDetalleMovimientoService: TipoDetalleMovimientoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tipoDetalleMovimientoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tipoDetalleMovimientos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoDetalleMovimientos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipoDetalleMovimiento) {
        return item.id;
    }
    registerChangeInTipoDetalleMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe('tipoDetalleMovimientoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
