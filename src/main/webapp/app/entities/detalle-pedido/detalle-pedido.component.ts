import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDetallePedido } from 'app/shared/model/detalle-pedido.model';
import { Principal } from 'app/core';
import { DetallePedidoService } from './detalle-pedido.service';

@Component({
    selector: 'jhi-detalle-pedido',
    templateUrl: './detalle-pedido.component.html'
})
export class DetallePedidoComponent implements OnInit, OnDestroy {
    detallePedidos: IDetallePedido[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private detallePedidoService: DetallePedidoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.detallePedidoService.query().subscribe(
            (res: HttpResponse<IDetallePedido[]>) => {
                this.detallePedidos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDetallePedidos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDetallePedido) {
        return item.id;
    }

    registerChangeInDetallePedidos() {
        this.eventSubscriber = this.eventManager.subscribe('detallePedidoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
