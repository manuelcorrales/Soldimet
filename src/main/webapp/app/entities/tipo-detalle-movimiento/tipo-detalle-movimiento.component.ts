import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { Principal } from 'app/core';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.service';

@Component({
    selector: 'jhi-tipo-detalle-movimiento',
    templateUrl: './tipo-detalle-movimiento.component.html'
})
export class TipoDetalleMovimientoComponent implements OnInit, OnDestroy {
    tipoDetalleMovimientos: ITipoDetalleMovimiento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoDetalleMovimientoService: TipoDetalleMovimientoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tipoDetalleMovimientoService.query().subscribe(
            (res: HttpResponse<ITipoDetalleMovimiento[]>) => {
                this.tipoDetalleMovimientos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoDetalleMovimientos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoDetalleMovimiento) {
        return item.id;
    }

    registerChangeInTipoDetalleMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe('tipoDetalleMovimientoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
