import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TipoDetalleMovimiento } from './tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from './tipo-detalle-movimiento.service';

@Component({
    selector: 'jhi-tipo-detalle-movimiento-detail',
    templateUrl: './tipo-detalle-movimiento-detail.component.html'
})
export class TipoDetalleMovimientoDetailComponent implements OnInit, OnDestroy {

    tipoDetalleMovimiento: TipoDetalleMovimiento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoDetalleMovimientoService: TipoDetalleMovimientoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoDetalleMovimientos();
    }

    load(id) {
        this.tipoDetalleMovimientoService.find(id).subscribe((tipoDetalleMovimiento) => {
            this.tipoDetalleMovimiento = tipoDetalleMovimiento;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoDetalleMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoDetalleMovimientoListModification',
            (response) => this.load(this.tipoDetalleMovimiento.id)
        );
    }
}
