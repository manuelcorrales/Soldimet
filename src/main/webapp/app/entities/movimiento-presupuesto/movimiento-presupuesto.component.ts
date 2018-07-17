import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { MovimientoPresupuesto } from './movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from './movimiento-presupuesto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-movimiento-presupuesto',
    templateUrl: './movimiento-presupuesto.component.html'
})
export class MovimientoPresupuestoComponent implements OnInit, OnDestroy {
movimientoPresupuestos: MovimientoPresupuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private movimientoPresupuestoService: MovimientoPresupuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.movimientoPresupuestoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.movimientoPresupuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMovimientoPresupuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MovimientoPresupuesto) {
        return item.id;
    }
    registerChangeInMovimientoPresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe('movimientoPresupuestoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
