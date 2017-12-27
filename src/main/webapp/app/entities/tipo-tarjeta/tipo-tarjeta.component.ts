import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { TipoTarjeta } from './tipo-tarjeta.model';
import { TipoTarjetaService } from './tipo-tarjeta.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tipo-tarjeta',
    templateUrl: './tipo-tarjeta.component.html'
})
export class TipoTarjetaComponent implements OnInit, OnDestroy {
tipoTarjetas: TipoTarjeta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoTarjetaService: TipoTarjetaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tipoTarjetaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tipoTarjetas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoTarjetas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipoTarjeta) {
        return item.id;
    }
    registerChangeInTipoTarjetas() {
        this.eventSubscriber = this.eventManager.subscribe('tipoTarjetaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
