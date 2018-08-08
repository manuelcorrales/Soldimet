import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPagoEfectivo } from 'app/shared/model/pago-efectivo.model';
import { Principal } from 'app/core';
import { PagoEfectivoService } from './pago-efectivo.service';

@Component({
    selector: 'jhi-pago-efectivo',
    templateUrl: './pago-efectivo.component.html'
})
export class PagoEfectivoComponent implements OnInit, OnDestroy {
    pagoEfectivos: IPagoEfectivo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pagoEfectivoService: PagoEfectivoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.pagoEfectivoService.query().subscribe(
            (res: HttpResponse<IPagoEfectivo[]>) => {
                this.pagoEfectivos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPagoEfectivos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPagoEfectivo) {
        return item.id;
    }

    registerChangeInPagoEfectivos() {
        this.eventSubscriber = this.eventManager.subscribe('pagoEfectivoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
