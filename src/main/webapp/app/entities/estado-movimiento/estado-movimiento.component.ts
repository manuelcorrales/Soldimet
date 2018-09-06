import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { Principal } from 'app/core';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento/estado-movimiento.service';

@Component({
    selector: 'jhi-estado-movimiento',
    templateUrl: './estado-movimiento.component.html'
})
export class EstadoMovimientoComponent implements OnInit, OnDestroy {
    estadoMovimientos: IEstadoMovimiento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoMovimientoService: EstadoMovimientoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.estadoMovimientoService.query().subscribe(
            (res: HttpResponse<IEstadoMovimiento[]>) => {
                this.estadoMovimientos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoMovimientos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEstadoMovimiento) {
        return item.id;
    }

    registerChangeInEstadoMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe('estadoMovimientoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
