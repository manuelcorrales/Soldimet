import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Aplicacion } from './aplicacion.model';
import { AplicacionService } from './aplicacion.service';

@Component({
    selector: 'jhi-aplicacion-detail',
    templateUrl: './aplicacion-detail.component.html'
})
export class AplicacionDetailComponent implements OnInit, OnDestroy {

    aplicacion: Aplicacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private aplicacionService: AplicacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAplicacions();
    }

    load(id) {
        this.aplicacionService.find(id).subscribe((aplicacion) => {
            this.aplicacion = aplicacion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAplicacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'aplicacionListModification',
            (response) => this.load(this.aplicacion.id)
        );
    }
}
