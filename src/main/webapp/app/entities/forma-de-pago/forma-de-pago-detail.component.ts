import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FormaDePago } from './forma-de-pago.model';
import { FormaDePagoService } from './forma-de-pago.service';

@Component({
    selector: 'jhi-forma-de-pago-detail',
    templateUrl: './forma-de-pago-detail.component.html'
})
export class FormaDePagoDetailComponent implements OnInit, OnDestroy {

    formaDePago: FormaDePago;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private formaDePagoService: FormaDePagoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFormaDePagos();
    }

    load(id) {
        this.formaDePagoService.find(id).subscribe((formaDePago) => {
            this.formaDePago = formaDePago;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFormaDePagos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'formaDePagoListModification',
            (response) => this.load(this.formaDePago.id)
        );
    }
}
