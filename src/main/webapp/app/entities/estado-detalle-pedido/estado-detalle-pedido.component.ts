import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { EstadoDetallePedido } from './estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from './estado-detalle-pedido.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-estado-detalle-pedido',
    templateUrl: './estado-detalle-pedido.component.html'
})
export class EstadoDetallePedidoComponent implements OnInit, OnDestroy {
estadoDetallePedidos: EstadoDetallePedido[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoDetallePedidoService: EstadoDetallePedidoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.estadoDetallePedidoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.estadoDetallePedidos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoDetallePedidos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EstadoDetallePedido) {
        return item.id;
    }
    registerChangeInEstadoDetallePedidos() {
        this.eventSubscriber = this.eventManager.subscribe('estadoDetallePedidoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
