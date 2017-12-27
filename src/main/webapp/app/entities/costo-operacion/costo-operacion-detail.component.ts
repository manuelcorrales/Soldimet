import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CostoOperacion } from './costo-operacion.model';
import { CostoOperacionService } from './costo-operacion.service';

@Component({
    selector: 'jhi-costo-operacion-detail',
    templateUrl: './costo-operacion-detail.component.html'
})
export class CostoOperacionDetailComponent implements OnInit, OnDestroy {

    costoOperacion: CostoOperacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private costoOperacionService: CostoOperacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCostoOperacions();
    }

    load(id) {
        this.costoOperacionService.find(id).subscribe((costoOperacion) => {
            this.costoOperacion = costoOperacion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCostoOperacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'costoOperacionListModification',
            (response) => this.load(this.costoOperacion.id)
        );
    }
}
