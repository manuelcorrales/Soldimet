import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DetalleMovimiento } from './detalle-movimiento.model';
import { DetalleMovimientoService } from './detalle-movimiento.service';

@Component({
    selector: 'jhi-detalle-movimiento-detail',
    templateUrl: './detalle-movimiento-detail.component.html'
})
export class DetalleMovimientoDetailComponent implements OnInit, OnDestroy {

    detalleMovimiento: DetalleMovimiento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private detalleMovimientoService: DetalleMovimientoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDetalleMovimientos();
    }

    load(id) {
        this.detalleMovimientoService.find(id).subscribe((detalleMovimiento) => {
            this.detalleMovimiento = detalleMovimiento;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDetalleMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'detalleMovimientoListModification',
            (response) => this.load(this.detalleMovimiento.id)
        );
    }
}
