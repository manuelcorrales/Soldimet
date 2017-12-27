import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoMovimiento } from './estado-movimiento.model';
import { EstadoMovimientoService } from './estado-movimiento.service';

@Component({
    selector: 'jhi-estado-movimiento-detail',
    templateUrl: './estado-movimiento-detail.component.html'
})
export class EstadoMovimientoDetailComponent implements OnInit, OnDestroy {

    estadoMovimiento: EstadoMovimiento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estadoMovimientoService: EstadoMovimientoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstadoMovimientos();
    }

    load(id) {
        this.estadoMovimientoService.find(id).subscribe((estadoMovimiento) => {
            this.estadoMovimiento = estadoMovimiento;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstadoMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estadoMovimientoListModification',
            (response) => this.load(this.estadoMovimiento.id)
        );
    }
}
