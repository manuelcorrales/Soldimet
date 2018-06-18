import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CobranzaRepuesto } from './cobranza-repuesto.model';
import { CobranzaRepuestoService } from './cobranza-repuesto.service';

@Component({
    selector: 'jhi-cobranza-repuesto-detail',
    templateUrl: './cobranza-repuesto-detail.component.html'
})
export class CobranzaRepuestoDetailComponent implements OnInit, OnDestroy {

    cobranzaRepuesto: CobranzaRepuesto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cobranzaRepuestoService: CobranzaRepuestoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCobranzaRepuestos();
    }

    load(id) {
        this.cobranzaRepuestoService.find(id).subscribe((cobranzaRepuesto) => {
            this.cobranzaRepuesto = cobranzaRepuesto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCobranzaRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cobranzaRepuestoListModification',
            (response) => this.load(this.cobranzaRepuesto.id)
        );
    }
}
