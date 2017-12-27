import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { PagoEfectivo } from './pago-efectivo.model';
import { PagoEfectivoService } from './pago-efectivo.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-pago-efectivo',
    templateUrl: './pago-efectivo.component.html'
})
export class PagoEfectivoComponent implements OnInit, OnDestroy {
pagoEfectivos: PagoEfectivo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pagoEfectivoService: PagoEfectivoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pagoEfectivoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.pagoEfectivos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPagoEfectivos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PagoEfectivo) {
        return item.id;
    }
    registerChangeInPagoEfectivos() {
        this.eventSubscriber = this.eventManager.subscribe('pagoEfectivoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
