import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Tarjeta } from './tarjeta.model';
import { TarjetaService } from './tarjeta.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tarjeta',
    templateUrl: './tarjeta.component.html'
})
export class TarjetaComponent implements OnInit, OnDestroy {
tarjetas: Tarjeta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tarjetaService: TarjetaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tarjetaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tarjetas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTarjetas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tarjeta) {
        return item.id;
    }
    registerChangeInTarjetas() {
        this.eventSubscriber = this.eventManager.subscribe('tarjetaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
