import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MovimientoArticulo } from './movimiento-articulo.model';
import { MovimientoArticuloService } from './movimiento-articulo.service';

@Component({
    selector: 'jhi-movimiento-articulo-detail',
    templateUrl: './movimiento-articulo-detail.component.html'
})
export class MovimientoArticuloDetailComponent implements OnInit, OnDestroy {

    movimientoArticulo: MovimientoArticulo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private movimientoArticuloService: MovimientoArticuloService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMovimientoArticulos();
    }

    load(id) {
        this.movimientoArticuloService.find(id).subscribe((movimientoArticulo) => {
            this.movimientoArticulo = movimientoArticulo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMovimientoArticulos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'movimientoArticuloListModification',
            (response) => this.load(this.movimientoArticulo.id)
        );
    }
}
