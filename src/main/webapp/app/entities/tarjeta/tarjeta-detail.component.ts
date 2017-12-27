import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tarjeta } from './tarjeta.model';
import { TarjetaService } from './tarjeta.service';

@Component({
    selector: 'jhi-tarjeta-detail',
    templateUrl: './tarjeta-detail.component.html'
})
export class TarjetaDetailComponent implements OnInit, OnDestroy {

    tarjeta: Tarjeta;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tarjetaService: TarjetaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTarjetas();
    }

    load(id) {
        this.tarjetaService.find(id).subscribe((tarjeta) => {
            this.tarjeta = tarjeta;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTarjetas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tarjetaListModification',
            (response) => this.load(this.tarjeta.id)
        );
    }
}
