import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { DetallePresupuesto } from './detalle-presupuesto.model';
import { DetallePresupuestoService } from './detalle-presupuesto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-detalle-presupuesto',
    templateUrl: './detalle-presupuesto.component.html'
})
export class DetallePresupuestoComponent implements OnInit, OnDestroy {
detallePresupuestos: DetallePresupuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private detallePresupuestoService: DetallePresupuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.detallePresupuestoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.detallePresupuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDetallePresupuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DetallePresupuesto) {
        return item.id;
    }
    registerChangeInDetallePresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe('detallePresupuestoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
