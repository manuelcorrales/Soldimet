import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoArticulo } from './estado-articulo.model';
import { EstadoArticuloService } from './estado-articulo.service';

@Component({
    selector: 'jhi-estado-articulo-detail',
    templateUrl: './estado-articulo-detail.component.html'
})
export class EstadoArticuloDetailComponent implements OnInit, OnDestroy {

    estadoArticulo: EstadoArticulo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estadoArticuloService: EstadoArticuloService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstadoArticulos();
    }

    load(id) {
        this.estadoArticuloService.find(id).subscribe((estadoArticulo) => {
            this.estadoArticulo = estadoArticulo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstadoArticulos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estadoArticuloListModification',
            (response) => this.load(this.estadoArticulo.id)
        );
    }
}
