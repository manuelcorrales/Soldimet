import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmpleado } from 'app/shared/model/empleado.model';
import { Principal } from 'app/core';
import { EmpleadoService } from 'app/entities/empleado/empleado.service';

@Component({
    selector: 'jhi-empleado',
    templateUrl: './empleado.component.html'
})
export class EmpleadoComponent implements OnInit, OnDestroy {
    empleados: IEmpleado[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private empleadoService: EmpleadoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.empleadoService.query().subscribe(
            (res: HttpResponse<IEmpleado[]>) => {
                this.empleados = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEmpleados();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEmpleado) {
        return item.id;
    }

    registerChangeInEmpleados() {
        this.eventSubscriber = this.eventManager.subscribe('empleadoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
