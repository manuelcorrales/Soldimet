import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Presupuesto } from './presupuesto.model';
import { PresupuestoService } from './presupuesto.service';

@Component({
    selector: 'jhi-presupuesto-detail',
    templateUrl: './presupuesto-detail.component.html'
})
export class PresupuestoDetailComponent implements OnInit, OnDestroy {

    presupuesto: Presupuesto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private presupuestoService: PresupuestoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPresupuestos();
    }

    load(id) {
        this.presupuestoService.find(id).subscribe((presupuesto) => {
            this.presupuesto = presupuesto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'presupuestoListModification',
            (response) => this.load(this.presupuesto.id)
        );
    }
}
