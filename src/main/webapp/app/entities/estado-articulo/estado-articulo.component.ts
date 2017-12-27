import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { EstadoArticulo } from './estado-articulo.model';
import { EstadoArticuloService } from './estado-articulo.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-estado-articulo',
    templateUrl: './estado-articulo.component.html'
})
export class EstadoArticuloComponent implements OnInit, OnDestroy {
estadoArticulos: EstadoArticulo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoArticuloService: EstadoArticuloService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.estadoArticuloService.query().subscribe(
            (res: ResponseWrapper) => {
                this.estadoArticulos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoArticulos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EstadoArticulo) {
        return item.id;
    }
    registerChangeInEstadoArticulos() {
        this.eventSubscriber = this.eventManager.subscribe('estadoArticuloListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
