import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHistorialPrecio } from 'app/shared/model/historial-precio.model';
import { Principal } from 'app/core';
import { HistorialPrecioService } from 'app/entities/historial-precio/historial-precio.service';

@Component({
    selector: 'jhi-historial-precio',
    templateUrl: './historial-precio.component.html'
})
export class HistorialPrecioComponent implements OnInit, OnDestroy {
    historialPrecios: IHistorialPrecio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private historialPrecioService: HistorialPrecioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.historialPrecioService.query().subscribe(
            (res: HttpResponse<IHistorialPrecio[]>) => {
                this.historialPrecios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHistorialPrecios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHistorialPrecio) {
        return item.id;
    }

    registerChangeInHistorialPrecios() {
        this.eventSubscriber = this.eventManager.subscribe('historialPrecioListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
