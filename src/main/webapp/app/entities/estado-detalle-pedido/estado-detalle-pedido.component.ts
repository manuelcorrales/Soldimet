import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';
import { Principal } from 'app/core';
import { EstadoDetallePedidoService } from './estado-detalle-pedido.service';

@Component({
    selector: 'jhi-estado-detalle-pedido',
    templateUrl: './estado-detalle-pedido.component.html'
})
export class EstadoDetallePedidoComponent implements OnInit, OnDestroy {
    estadoDetallePedidos: IEstadoDetallePedido[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoDetallePedidoService: EstadoDetallePedidoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.estadoDetallePedidoService.query().subscribe(
            (res: HttpResponse<IEstadoDetallePedido[]>) => {
                this.estadoDetallePedidos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoDetallePedidos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEstadoDetallePedido) {
        return item.id;
    }

    registerChangeInEstadoDetallePedidos() {
        this.eventSubscriber = this.eventManager.subscribe('estadoDetallePedidoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
