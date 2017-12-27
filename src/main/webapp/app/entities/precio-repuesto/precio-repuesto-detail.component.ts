import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PrecioRepuesto } from './precio-repuesto.model';
import { PrecioRepuestoService } from './precio-repuesto.service';

@Component({
    selector: 'jhi-precio-repuesto-detail',
    templateUrl: './precio-repuesto-detail.component.html'
})
export class PrecioRepuestoDetailComponent implements OnInit, OnDestroy {

    precioRepuesto: PrecioRepuesto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private precioRepuestoService: PrecioRepuestoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrecioRepuestos();
    }

    load(id) {
        this.precioRepuestoService.find(id).subscribe((precioRepuesto) => {
            this.precioRepuesto = precioRepuesto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrecioRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'precioRepuestoListModification',
            (response) => this.load(this.precioRepuesto.id)
        );
    }
}
