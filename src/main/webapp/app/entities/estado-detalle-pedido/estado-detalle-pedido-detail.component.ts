import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoDetallePedido } from './estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from './estado-detalle-pedido.service';

@Component({
    selector: 'jhi-estado-detalle-pedido-detail',
    templateUrl: './estado-detalle-pedido-detail.component.html'
})
export class EstadoDetallePedidoDetailComponent implements OnInit, OnDestroy {

    estadoDetallePedido: EstadoDetallePedido;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estadoDetallePedidoService: EstadoDetallePedidoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstadoDetallePedidos();
    }

    load(id) {
        this.estadoDetallePedidoService.find(id).subscribe((estadoDetallePedido) => {
            this.estadoDetallePedido = estadoDetallePedido;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstadoDetallePedidos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estadoDetallePedidoListModification',
            (response) => this.load(this.estadoDetallePedido.id)
        );
    }
}
