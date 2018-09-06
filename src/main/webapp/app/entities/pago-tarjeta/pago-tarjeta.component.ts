import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPagoTarjeta } from 'app/shared/model/pago-tarjeta.model';
import { Principal } from 'app/core';
import { PagoTarjetaService } from 'app/entities/pago-tarjeta/pago-tarjeta.service';

@Component({
    selector: 'jhi-pago-tarjeta',
    templateUrl: './pago-tarjeta.component.html'
})
export class PagoTarjetaComponent implements OnInit, OnDestroy {
    pagoTarjetas: IPagoTarjeta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pagoTarjetaService: PagoTarjetaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.pagoTarjetaService.query().subscribe(
            (res: HttpResponse<IPagoTarjeta[]>) => {
                this.pagoTarjetas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPagoTarjetas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPagoTarjeta) {
        return item.id;
    }

    registerChangeInPagoTarjetas() {
        this.eventSubscriber = this.eventManager.subscribe('pagoTarjetaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
