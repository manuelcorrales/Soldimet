import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { EstadoPedidoRepuesto } from './estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from './estado-pedido-repuesto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-estado-pedido-repuesto',
    templateUrl: './estado-pedido-repuesto.component.html'
})
export class EstadoPedidoRepuestoComponent implements OnInit, OnDestroy {
estadoPedidoRepuestos: EstadoPedidoRepuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.estadoPedidoRepuestoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.estadoPedidoRepuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoPedidoRepuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EstadoPedidoRepuesto) {
        return item.id;
    }
    registerChangeInEstadoPedidoRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe('estadoPedidoRepuestoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
