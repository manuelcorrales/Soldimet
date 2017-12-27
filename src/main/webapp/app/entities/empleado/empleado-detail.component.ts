import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Empleado } from './empleado.model';
import { EmpleadoService } from './empleado.service';

@Component({
    selector: 'jhi-empleado-detail',
    templateUrl: './empleado-detail.component.html'
})
export class EmpleadoDetailComponent implements OnInit, OnDestroy {

    empleado: Empleado;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private empleadoService: EmpleadoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmpleados();
    }

    load(id) {
        this.empleadoService.find(id).subscribe((empleado) => {
            this.empleado = empleado;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmpleados() {
        this.eventSubscriber = this.eventManager.subscribe(
            'empleadoListModification',
            (response) => this.load(this.empleado.id)
        );
    }
}
