import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CategoriaPago } from './categoria-pago.model';
import { CategoriaPagoService } from './categoria-pago.service';

@Component({
    selector: 'jhi-categoria-pago-detail',
    templateUrl: './categoria-pago-detail.component.html'
})
export class CategoriaPagoDetailComponent implements OnInit, OnDestroy {

    categoriaPago: CategoriaPago;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private categoriaPagoService: CategoriaPagoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCategoriaPagos();
    }

    load(id) {
        this.categoriaPagoService.find(id).subscribe((categoriaPago) => {
            this.categoriaPago = categoriaPago;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCategoriaPagos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'categoriaPagoListModification',
            (response) => this.load(this.categoriaPago.id)
        );
    }
}
