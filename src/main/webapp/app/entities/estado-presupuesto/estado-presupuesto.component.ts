import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { EstadoPresupuesto } from './estado-presupuesto.model';
import { EstadoPresupuestoService } from './estado-presupuesto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-estado-presupuesto',
    templateUrl: './estado-presupuesto.component.html'
})
export class EstadoPresupuestoComponent implements OnInit, OnDestroy {
estadoPresupuestos: EstadoPresupuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoPresupuestoService: EstadoPresupuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.estadoPresupuestoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.estadoPresupuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoPresupuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EstadoPresupuesto) {
        return item.id;
    }
    registerChangeInEstadoPresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe('estadoPresupuestoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
