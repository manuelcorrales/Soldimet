import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoPedidoRepuesto } from './estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from './estado-pedido-repuesto.service';

@Component({
    selector: 'jhi-estado-pedido-repuesto-detail',
    templateUrl: './estado-pedido-repuesto-detail.component.html'
})
export class EstadoPedidoRepuestoDetailComponent implements OnInit, OnDestroy {

    estadoPedidoRepuesto: EstadoPedidoRepuesto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstadoPedidoRepuestos();
    }

    load(id) {
        this.estadoPedidoRepuestoService.find(id).subscribe((estadoPedidoRepuesto) => {
            this.estadoPedidoRepuesto = estadoPedidoRepuesto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstadoPedidoRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estadoPedidoRepuestoListModification',
            (response) => this.load(this.estadoPedidoRepuesto.id)
        );
    }
}
