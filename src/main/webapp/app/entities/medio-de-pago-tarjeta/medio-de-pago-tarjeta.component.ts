import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';
import { Principal } from 'app/core';
import { MedioDePagoTarjetaService } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta.service';

@Component({
    selector: 'jhi-medio-de-pago-tarjeta',
    templateUrl: './medio-de-pago-tarjeta.component.html'
})
export class MedioDePagoTarjetaComponent implements OnInit, OnDestroy {
    medioDePagoTarjetas: IMedioDePagoTarjeta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private medioDePagoTarjetaService: MedioDePagoTarjetaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.medioDePagoTarjetaService.query().subscribe(
            (res: HttpResponse<IMedioDePagoTarjeta[]>) => {
                this.medioDePagoTarjetas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMedioDePagoTarjetas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMedioDePagoTarjeta) {
        return item.id;
    }

    registerChangeInMedioDePagoTarjetas() {
        this.eventSubscriber = this.eventManager.subscribe('medioDePagoTarjetaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
