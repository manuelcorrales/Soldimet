import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { TipoMovimiento } from './tipo-movimiento.model';
import { TipoMovimientoService } from './tipo-movimiento.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tipo-movimiento',
    templateUrl: './tipo-movimiento.component.html'
})
export class TipoMovimientoComponent implements OnInit, OnDestroy {
tipoMovimientos: TipoMovimiento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoMovimientoService: TipoMovimientoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tipoMovimientoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tipoMovimientos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoMovimientos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipoMovimiento) {
        return item.id;
    }
    registerChangeInTipoMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe('tipoMovimientoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
