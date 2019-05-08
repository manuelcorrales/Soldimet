import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedioDePago } from 'app/shared/model/medio-de-pago.model';
import { Principal } from 'app/core';
import { MedioDePagoService } from './medio-de-pago.service';

@Component({
    selector: 'jhi-medio-de-pago',
    templateUrl: './medio-de-pago.component.html'
})
export class MedioDePagoComponent implements OnInit, OnDestroy {
    medioDePagos: IMedioDePago[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private medioDePagoService: MedioDePagoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.medioDePagoService.query().subscribe(
            (res: HttpResponse<IMedioDePago[]>) => {
                this.medioDePagos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMedioDePagos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMedioDePago) {
        return item.id;
    }

    registerChangeInMedioDePagos() {
        this.eventSubscriber = this.eventManager.subscribe('medioDePagoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
