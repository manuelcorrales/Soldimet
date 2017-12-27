import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TipoTarjeta } from './tipo-tarjeta.model';
import { TipoTarjetaService } from './tipo-tarjeta.service';

@Component({
    selector: 'jhi-tipo-tarjeta-detail',
    templateUrl: './tipo-tarjeta-detail.component.html'
})
export class TipoTarjetaDetailComponent implements OnInit, OnDestroy {

    tipoTarjeta: TipoTarjeta;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoTarjetaService: TipoTarjetaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoTarjetas();
    }

    load(id) {
        this.tipoTarjetaService.find(id).subscribe((tipoTarjeta) => {
            this.tipoTarjeta = tipoTarjeta;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoTarjetas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoTarjetaListModification',
            (response) => this.load(this.tipoTarjeta.id)
        );
    }
}
