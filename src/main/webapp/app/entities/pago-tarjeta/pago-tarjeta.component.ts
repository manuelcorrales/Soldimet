import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { PagoTarjeta } from './pago-tarjeta.model';
import { PagoTarjetaService } from './pago-tarjeta.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-pago-tarjeta',
    templateUrl: './pago-tarjeta.component.html'
})
export class PagoTarjetaComponent implements OnInit, OnDestroy {
pagoTarjetas: PagoTarjeta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pagoTarjetaService: PagoTarjetaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pagoTarjetaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.pagoTarjetas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPagoTarjetas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PagoTarjeta) {
        return item.id;
    }
    registerChangeInPagoTarjetas() {
        this.eventSubscriber = this.eventManager.subscribe('pagoTarjetaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
