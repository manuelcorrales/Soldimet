import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';
import { Principal } from 'app/core';
import { MovimientoPresupuestoService } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.service';

@Component({
    selector: 'jhi-movimiento-presupuesto',
    templateUrl: './movimiento-presupuesto.component.html'
})
export class MovimientoPresupuestoComponent implements OnInit, OnDestroy {
    movimientoPresupuestos: IMovimientoPresupuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private movimientoPresupuestoService: MovimientoPresupuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.movimientoPresupuestoService.query().subscribe(
            (res: HttpResponse<IMovimientoPresupuesto[]>) => {
                this.movimientoPresupuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMovimientoPresupuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMovimientoPresupuesto) {
        return item.id;
    }

    registerChangeInMovimientoPresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe('movimientoPresupuestoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
