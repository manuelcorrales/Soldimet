import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CostoRepuesto } from './costo-repuesto.model';
import { CostoRepuestoService } from './costo-repuesto.service';

@Component({
    selector: 'jhi-costo-repuesto-detail',
    templateUrl: './costo-repuesto-detail.component.html'
})
export class CostoRepuestoDetailComponent implements OnInit, OnDestroy {

    costoRepuesto: CostoRepuesto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private costoRepuestoService: CostoRepuestoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCostoRepuestos();
    }

    load(id) {
        this.costoRepuestoService.find(id).subscribe((costoRepuesto) => {
            this.costoRepuesto = costoRepuesto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCostoRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'costoRepuestoListModification',
            (response) => this.load(this.costoRepuesto.id)
        );
    }
}
