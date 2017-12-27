import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoCobranzaOperacion } from './estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from './estado-cobranza-operacion.service';

@Component({
    selector: 'jhi-estado-cobranza-operacion-detail',
    templateUrl: './estado-cobranza-operacion-detail.component.html'
})
export class EstadoCobranzaOperacionDetailComponent implements OnInit, OnDestroy {

    estadoCobranzaOperacion: EstadoCobranzaOperacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstadoCobranzaOperacions();
    }

    load(id) {
        this.estadoCobranzaOperacionService.find(id).subscribe((estadoCobranzaOperacion) => {
            this.estadoCobranzaOperacion = estadoCobranzaOperacion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstadoCobranzaOperacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estadoCobranzaOperacionListModification',
            (response) => this.load(this.estadoCobranzaOperacion.id)
        );
    }
}
