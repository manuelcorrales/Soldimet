import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { Principal } from 'app/core';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento/tipo-movimiento.service';

@Component({
    selector: 'jhi-tipo-movimiento',
    templateUrl: './tipo-movimiento.component.html'
})
export class TipoMovimientoComponent implements OnInit, OnDestroy {
    tipoMovimientos: ITipoMovimiento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoMovimientoService: TipoMovimientoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tipoMovimientoService.query().subscribe(
            (res: HttpResponse<ITipoMovimiento[]>) => {
                this.tipoMovimientos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoMovimientos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoMovimiento) {
        return item.id;
    }

    registerChangeInTipoMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe('tipoMovimientoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
