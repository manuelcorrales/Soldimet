import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Movimiento } from './movimiento.model';
import { MovimientoService } from './movimiento.service';

@Component({
    selector: 'jhi-movimiento-detail',
    templateUrl: './movimiento-detail.component.html'
})
export class MovimientoDetailComponent implements OnInit, OnDestroy {

    movimiento: Movimiento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private movimientoService: MovimientoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMovimientos();
    }

    load(id) {
        this.movimientoService.find(id).subscribe((movimiento) => {
            this.movimiento = movimiento;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'movimientoListModification',
            (response) => this.load(this.movimiento.id)
        );
    }
}
