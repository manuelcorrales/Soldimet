import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { Principal } from 'app/core';
import { DetallePresupuestoService } from './detalle-presupuesto.service';

@Component({
    selector: 'jhi-detalle-presupuesto',
    templateUrl: './detalle-presupuesto.component.html'
})
export class DetallePresupuestoComponent implements OnInit, OnDestroy {
    detallePresupuestos: IDetallePresupuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private detallePresupuestoService: DetallePresupuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.detallePresupuestoService.query().subscribe(
            (res: HttpResponse<IDetallePresupuesto[]>) => {
                this.detallePresupuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDetallePresupuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDetallePresupuesto) {
        return item.id;
    }

    registerChangeInDetallePresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe('detallePresupuestoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
