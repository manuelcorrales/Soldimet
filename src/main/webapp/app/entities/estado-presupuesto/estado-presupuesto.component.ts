import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { Principal } from 'app/core';
import { EstadoPresupuestoService } from './estado-presupuesto.service';

@Component({
    selector: 'jhi-estado-presupuesto',
    templateUrl: './estado-presupuesto.component.html'
})
export class EstadoPresupuestoComponent implements OnInit, OnDestroy {
    estadoPresupuestos: IEstadoPresupuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoPresupuestoService: EstadoPresupuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.estadoPresupuestoService.query().subscribe(
            (res: HttpResponse<IEstadoPresupuesto[]>) => {
                this.estadoPresupuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoPresupuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEstadoPresupuesto) {
        return item.id;
    }

    registerChangeInEstadoPresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe('estadoPresupuestoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
