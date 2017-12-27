import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PedidoRepuesto } from './pedido-repuesto.model';
import { PedidoRepuestoService } from './pedido-repuesto.service';

@Component({
    selector: 'jhi-pedido-repuesto-detail',
    templateUrl: './pedido-repuesto-detail.component.html'
})
export class PedidoRepuestoDetailComponent implements OnInit, OnDestroy {

    pedidoRepuesto: PedidoRepuesto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pedidoRepuestoService: PedidoRepuestoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPedidoRepuestos();
    }

    load(id) {
        this.pedidoRepuestoService.find(id).subscribe((pedidoRepuesto) => {
            this.pedidoRepuesto = pedidoRepuesto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPedidoRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pedidoRepuestoListModification',
            (response) => this.load(this.pedidoRepuesto.id)
        );
    }
}
