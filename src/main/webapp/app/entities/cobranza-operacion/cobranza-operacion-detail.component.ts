import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CobranzaOperacion } from './cobranza-operacion.model';
import { CobranzaOperacionService } from './cobranza-operacion.service';

@Component({
    selector: 'jhi-cobranza-operacion-detail',
    templateUrl: './cobranza-operacion-detail.component.html'
})
export class CobranzaOperacionDetailComponent implements OnInit, OnDestroy {

    cobranzaOperacion: CobranzaOperacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cobranzaOperacionService: CobranzaOperacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCobranzaOperacions();
    }

    load(id) {
        this.cobranzaOperacionService.find(id).subscribe((cobranzaOperacion) => {
            this.cobranzaOperacion = cobranzaOperacion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCobranzaOperacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cobranzaOperacionListModification',
            (response) => this.load(this.cobranzaOperacion.id)
        );
    }
}
