import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Direccion } from './direccion.model';
import { DireccionService } from './direccion.service';

@Component({
    selector: 'jhi-direccion-detail',
    templateUrl: './direccion-detail.component.html'
})
export class DireccionDetailComponent implements OnInit, OnDestroy {

    direccion: Direccion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private direccionService: DireccionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDireccions();
    }

    load(id) {
        this.direccionService.find(id).subscribe((direccion) => {
            this.direccion = direccion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDireccions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'direccionListModification',
            (response) => this.load(this.direccion.id)
        );
    }
}
