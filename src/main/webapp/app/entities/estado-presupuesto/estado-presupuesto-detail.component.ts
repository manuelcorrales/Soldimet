import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoPresupuesto } from './estado-presupuesto.model';
import { EstadoPresupuestoService } from './estado-presupuesto.service';

@Component({
    selector: 'jhi-estado-presupuesto-detail',
    templateUrl: './estado-presupuesto-detail.component.html'
})
export class EstadoPresupuestoDetailComponent implements OnInit, OnDestroy {

    estadoPresupuesto: EstadoPresupuesto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estadoPresupuestoService: EstadoPresupuestoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstadoPresupuestos();
    }

    load(id) {
        this.estadoPresupuestoService.find(id).subscribe((estadoPresupuesto) => {
            this.estadoPresupuesto = estadoPresupuesto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstadoPresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estadoPresupuestoListModification',
            (response) => this.load(this.estadoPresupuesto.id)
        );
    }
}
