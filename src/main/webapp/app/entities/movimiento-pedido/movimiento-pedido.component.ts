import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMovimientoPedido } from 'app/shared/model/movimiento-pedido.model';
import { Principal } from 'app/core';
import { MovimientoPedidoService } from './movimiento-pedido.service';

@Component({
    selector: 'jhi-movimiento-pedido',
    templateUrl: './movimiento-pedido.component.html'
})
export class MovimientoPedidoComponent implements OnInit, OnDestroy {
    movimientoPedidos: IMovimientoPedido[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private movimientoPedidoService: MovimientoPedidoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.movimientoPedidoService.query().subscribe(
            (res: HttpResponse<IMovimientoPedido[]>) => {
                this.movimientoPedidos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMovimientoPedidos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMovimientoPedido) {
        return item.id;
    }

    registerChangeInMovimientoPedidos() {
        this.eventSubscriber = this.eventManager.subscribe('movimientoPedidoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
