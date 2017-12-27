import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TipoRepuesto } from './tipo-repuesto.model';
import { TipoRepuestoService } from './tipo-repuesto.service';

@Component({
    selector: 'jhi-tipo-repuesto-detail',
    templateUrl: './tipo-repuesto-detail.component.html'
})
export class TipoRepuestoDetailComponent implements OnInit, OnDestroy {

    tipoRepuesto: TipoRepuesto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoRepuestoService: TipoRepuestoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoRepuestos();
    }

    load(id) {
        this.tipoRepuestoService.find(id).subscribe((tipoRepuesto) => {
            this.tipoRepuesto = tipoRepuesto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoRepuestoListModification',
            (response) => this.load(this.tipoRepuesto.id)
        );
    }
}
