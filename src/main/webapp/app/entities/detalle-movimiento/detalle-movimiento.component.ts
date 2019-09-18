import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';
import { Principal } from 'app/core';
import { DetalleMovimientoService } from 'app/entities/detalle-movimiento/detalle-movimiento.service';

@Component({
    selector: 'jhi-detalle-movimiento',
    templateUrl: './detalle-movimiento.component.html'
})
export class DetalleMovimientoComponent implements OnInit, OnDestroy {
    detalleMovimientos: IDetalleMovimiento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private detalleMovimientoService: DetalleMovimientoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.detalleMovimientoService.query().subscribe(
            (res: HttpResponse<IDetalleMovimiento[]>) => {
                this.detalleMovimientos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDetalleMovimientos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDetalleMovimiento) {
        return item.id;
    }

    registerChangeInDetalleMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe('detalleMovimientoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
