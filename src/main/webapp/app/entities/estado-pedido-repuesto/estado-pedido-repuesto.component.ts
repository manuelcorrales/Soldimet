import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';
import { Principal } from 'app/core';
import { EstadoPedidoRepuestoService } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.service';

@Component({
    selector: 'jhi-estado-pedido-repuesto',
    templateUrl: './estado-pedido-repuesto.component.html'
})
export class EstadoPedidoRepuestoComponent implements OnInit, OnDestroy {
    estadoPedidoRepuestos: IEstadoPedidoRepuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.estadoPedidoRepuestoService.query().subscribe(
            (res: HttpResponse<IEstadoPedidoRepuesto[]>) => {
                this.estadoPedidoRepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoPedidoRepuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEstadoPedidoRepuesto) {
        return item.id;
    }

    registerChangeInEstadoPedidoRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe('estadoPedidoRepuestoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
