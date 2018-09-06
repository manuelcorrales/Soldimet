import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { Principal } from 'app/core';
import { CostoRepuestoService } from 'app/entities/costo-repuesto/costo-repuesto.service';

@Component({
    selector: 'jhi-costo-repuesto',
    templateUrl: './costo-repuesto.component.html'
})
export class CostoRepuestoComponent implements OnInit, OnDestroy {
    costoRepuestos: ICostoRepuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private costoRepuestoService: CostoRepuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.costoRepuestoService.query().subscribe(
            (res: HttpResponse<ICostoRepuesto[]>) => {
                this.costoRepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCostoRepuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICostoRepuesto) {
        return item.id;
    }

    registerChangeInCostoRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe('costoRepuestoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
