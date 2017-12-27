import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DetallePresupuesto } from './detalle-presupuesto.model';
import { DetallePresupuestoService } from './detalle-presupuesto.service';

@Component({
    selector: 'jhi-detalle-presupuesto-detail',
    templateUrl: './detalle-presupuesto-detail.component.html'
})
export class DetallePresupuestoDetailComponent implements OnInit, OnDestroy {

    detallePresupuesto: DetallePresupuesto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private detallePresupuestoService: DetallePresupuestoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDetallePresupuestos();
    }

    load(id) {
        this.detallePresupuestoService.find(id).subscribe((detallePresupuesto) => {
            this.detallePresupuesto = detallePresupuesto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDetallePresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'detallePresupuestoListModification',
            (response) => this.load(this.detallePresupuesto.id)
        );
    }
}
