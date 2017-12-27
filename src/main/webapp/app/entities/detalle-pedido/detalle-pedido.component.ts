import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { DetallePedido } from './detalle-pedido.model';
import { DetallePedidoService } from './detalle-pedido.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-detalle-pedido',
    templateUrl: './detalle-pedido.component.html'
})
export class DetallePedidoComponent implements OnInit, OnDestroy {
detallePedidos: DetallePedido[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private detallePedidoService: DetallePedidoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.detallePedidoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.detallePedidos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDetallePedidos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DetallePedido) {
        return item.id;
    }
    registerChangeInDetallePedidos() {
        this.eventSubscriber = this.eventManager.subscribe('detallePedidoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
