import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PagoEfectivo } from './pago-efectivo.model';
import { PagoEfectivoService } from './pago-efectivo.service';

@Component({
    selector: 'jhi-pago-efectivo-detail',
    templateUrl: './pago-efectivo-detail.component.html'
})
export class PagoEfectivoDetailComponent implements OnInit, OnDestroy {

    pagoEfectivo: PagoEfectivo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pagoEfectivoService: PagoEfectivoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPagoEfectivos();
    }

    load(id) {
        this.pagoEfectivoService.find(id).subscribe((pagoEfectivo) => {
            this.pagoEfectivo = pagoEfectivo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPagoEfectivos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pagoEfectivoListModification',
            (response) => this.load(this.pagoEfectivo.id)
        );
    }
}
