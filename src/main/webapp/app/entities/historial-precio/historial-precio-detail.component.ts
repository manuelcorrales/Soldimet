import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HistorialPrecio } from './historial-precio.model';
import { HistorialPrecioService } from './historial-precio.service';

@Component({
    selector: 'jhi-historial-precio-detail',
    templateUrl: './historial-precio-detail.component.html'
})
export class HistorialPrecioDetailComponent implements OnInit, OnDestroy {

    historialPrecio: HistorialPrecio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private historialPrecioService: HistorialPrecioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHistorialPrecios();
    }

    load(id) {
        this.historialPrecioService.find(id).subscribe((historialPrecio) => {
            this.historialPrecio = historialPrecio;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHistorialPrecios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'historialPrecioListModification',
            (response) => this.load(this.historialPrecio.id)
        );
    }
}
