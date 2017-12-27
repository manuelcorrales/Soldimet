import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PagoTarjeta } from './pago-tarjeta.model';
import { PagoTarjetaService } from './pago-tarjeta.service';

@Component({
    selector: 'jhi-pago-tarjeta-detail',
    templateUrl: './pago-tarjeta-detail.component.html'
})
export class PagoTarjetaDetailComponent implements OnInit, OnDestroy {

    pagoTarjeta: PagoTarjeta;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pagoTarjetaService: PagoTarjetaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPagoTarjetas();
    }

    load(id) {
        this.pagoTarjetaService.find(id).subscribe((pagoTarjeta) => {
            this.pagoTarjeta = pagoTarjeta;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPagoTarjetas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pagoTarjetaListModification',
            (response) => this.load(this.pagoTarjeta.id)
        );
    }
}
