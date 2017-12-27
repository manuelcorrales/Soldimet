import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Caja } from './caja.model';
import { CajaService } from './caja.service';

@Component({
    selector: 'jhi-caja-detail',
    templateUrl: './caja-detail.component.html'
})
export class CajaDetailComponent implements OnInit, OnDestroy {

    caja: Caja;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cajaService: CajaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCajas();
    }

    load(id) {
        this.cajaService.find(id).subscribe((caja) => {
            this.caja = caja;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCajas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cajaListModification',
            (response) => this.load(this.caja.id)
        );
    }
}
