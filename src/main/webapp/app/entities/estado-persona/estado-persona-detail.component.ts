import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoPersona } from './estado-persona.model';
import { EstadoPersonaService } from './estado-persona.service';

@Component({
    selector: 'jhi-estado-persona-detail',
    templateUrl: './estado-persona-detail.component.html'
})
export class EstadoPersonaDetailComponent implements OnInit, OnDestroy {

    estadoPersona: EstadoPersona;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estadoPersonaService: EstadoPersonaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstadoPersonas();
    }

    load(id) {
        this.estadoPersonaService.find(id).subscribe((estadoPersona) => {
            this.estadoPersona = estadoPersona;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstadoPersonas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estadoPersonaListModification',
            (response) => this.load(this.estadoPersona.id)
        );
    }
}
