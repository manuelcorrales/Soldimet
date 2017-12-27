import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Localidad } from './localidad.model';
import { LocalidadService } from './localidad.service';

@Component({
    selector: 'jhi-localidad-detail',
    templateUrl: './localidad-detail.component.html'
})
export class LocalidadDetailComponent implements OnInit, OnDestroy {

    localidad: Localidad;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private localidadService: LocalidadService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLocalidads();
    }

    load(id) {
        this.localidadService.find(id).subscribe((localidad) => {
            this.localidad = localidad;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLocalidads() {
        this.eventSubscriber = this.eventManager.subscribe(
            'localidadListModification',
            (response) => this.load(this.localidad.id)
        );
    }
}
