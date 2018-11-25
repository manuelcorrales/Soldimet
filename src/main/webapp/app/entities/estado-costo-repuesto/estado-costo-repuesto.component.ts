import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { Principal } from 'app/core';
import { EstadoCostoRepuestoService } from './estado-costo-repuesto.service';

@Component({
    selector: 'jhi-estado-costo-repuesto',
    templateUrl: './estado-costo-repuesto.component.html'
})
export class EstadoCostoRepuestoComponent implements OnInit, OnDestroy {
    estadoCostoRepuestos: IEstadoCostoRepuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoCostoRepuestoService: EstadoCostoRepuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.estadoCostoRepuestoService.query().subscribe(
            (res: HttpResponse<IEstadoCostoRepuesto[]>) => {
                this.estadoCostoRepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoCostoRepuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEstadoCostoRepuesto) {
        return item.id;
    }

    registerChangeInEstadoCostoRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe('estadoCostoRepuestoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
