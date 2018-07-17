import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MovimientoPedido } from './movimiento-pedido.model';
import { MovimientoPedidoService } from './movimiento-pedido.service';

@Component({
    selector: 'jhi-movimiento-pedido-detail',
    templateUrl: './movimiento-pedido-detail.component.html'
})
export class MovimientoPedidoDetailComponent implements OnInit, OnDestroy {

    movimientoPedido: MovimientoPedido;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private movimientoPedidoService: MovimientoPedidoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMovimientoPedidos();
    }

    load(id) {
        this.movimientoPedidoService.find(id).subscribe((movimientoPedido) => {
            this.movimientoPedido = movimientoPedido;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMovimientoPedidos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'movimientoPedidoListModification',
            (response) => this.load(this.movimientoPedido.id)
        );
    }
}
