import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MovimientoPresupuesto } from './movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from './movimiento-presupuesto.service';

@Component({
    selector: 'jhi-movimiento-presupuesto-detail',
    templateUrl: './movimiento-presupuesto-detail.component.html'
})
export class MovimientoPresupuestoDetailComponent implements OnInit, OnDestroy {

    movimientoPresupuesto: MovimientoPresupuesto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private movimientoPresupuestoService: MovimientoPresupuestoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMovimientoPresupuestos();
    }

    load(id) {
        this.movimientoPresupuestoService.find(id).subscribe((movimientoPresupuesto) => {
            this.movimientoPresupuesto = movimientoPresupuesto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMovimientoPresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'movimientoPresupuestoListModification',
            (response) => this.load(this.movimientoPresupuesto.id)
        );
    }
}
