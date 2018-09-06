import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';
import { Principal } from 'app/core';
import { MovimientoArticuloService } from 'app/entities/movimiento-articulo/movimiento-articulo.service';

@Component({
    selector: 'jhi-movimiento-articulo',
    templateUrl: './movimiento-articulo.component.html'
})
export class MovimientoArticuloComponent implements OnInit, OnDestroy {
    movimientoArticulos: IMovimientoArticulo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private movimientoArticuloService: MovimientoArticuloService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.movimientoArticuloService.query().subscribe(
            (res: HttpResponse<IMovimientoArticulo[]>) => {
                this.movimientoArticulos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMovimientoArticulos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMovimientoArticulo) {
        return item.id;
    }

    registerChangeInMovimientoArticulos() {
        this.eventSubscriber = this.eventManager.subscribe('movimientoArticuloListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
