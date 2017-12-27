import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoOperacion } from './estado-operacion.model';
import { EstadoOperacionService } from './estado-operacion.service';

@Component({
    selector: 'jhi-estado-operacion-detail',
    templateUrl: './estado-operacion-detail.component.html'
})
export class EstadoOperacionDetailComponent implements OnInit, OnDestroy {

    estadoOperacion: EstadoOperacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estadoOperacionService: EstadoOperacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstadoOperacions();
    }

    load(id) {
        this.estadoOperacionService.find(id).subscribe((estadoOperacion) => {
            this.estadoOperacion = estadoOperacion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstadoOperacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estadoOperacionListModification',
            (response) => this.load(this.estadoOperacion.id)
        );
    }
}
