import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TipoMovimiento } from './tipo-movimiento.model';
import { TipoMovimientoService } from './tipo-movimiento.service';

@Component({
    selector: 'jhi-tipo-movimiento-detail',
    templateUrl: './tipo-movimiento-detail.component.html'
})
export class TipoMovimientoDetailComponent implements OnInit, OnDestroy {

    tipoMovimiento: TipoMovimiento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoMovimientoService: TipoMovimientoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoMovimientos();
    }

    load(id) {
        this.tipoMovimientoService.find(id).subscribe((tipoMovimiento) => {
            this.tipoMovimiento = tipoMovimiento;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoMovimientoListModification',
            (response) => this.load(this.tipoMovimiento.id)
        );
    }
}
