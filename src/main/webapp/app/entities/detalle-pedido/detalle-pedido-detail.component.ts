import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DetallePedido } from './detalle-pedido.model';
import { DetallePedidoService } from './detalle-pedido.service';

@Component({
    selector: 'jhi-detalle-pedido-detail',
    templateUrl: './detalle-pedido-detail.component.html'
})
export class DetallePedidoDetailComponent implements OnInit, OnDestroy {

    detallePedido: DetallePedido;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private detallePedidoService: DetallePedidoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDetallePedidos();
    }

    load(id) {
        this.detallePedidoService.find(id).subscribe((detallePedido) => {
            this.detallePedido = detallePedido;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDetallePedidos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'detallePedidoListModification',
            (response) => this.load(this.detallePedido.id)
        );
    }
}
