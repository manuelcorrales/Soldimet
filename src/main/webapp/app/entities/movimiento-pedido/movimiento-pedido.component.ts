import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { MovimientoPedido } from './movimiento-pedido.model';
import { MovimientoPedidoService } from './movimiento-pedido.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-movimiento-pedido',
    templateUrl: './movimiento-pedido.component.html'
})
export class MovimientoPedidoComponent implements OnInit, OnDestroy {
movimientoPedidos: MovimientoPedido[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private movimientoPedidoService: MovimientoPedidoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.movimientoPedidoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.movimientoPedidos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMovimientoPedidos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MovimientoPedido) {
        return item.id;
    }
    registerChangeInMovimientoPedidos() {
        this.eventSubscriber = this.eventManager.subscribe('movimientoPedidoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
