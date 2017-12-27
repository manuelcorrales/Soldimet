import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { EstadoCobranzaOperacion } from './estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from './estado-cobranza-operacion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-estado-cobranza-operacion',
    templateUrl: './estado-cobranza-operacion.component.html'
})
export class EstadoCobranzaOperacionComponent implements OnInit, OnDestroy {
estadoCobranzaOperacions: EstadoCobranzaOperacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.estadoCobranzaOperacionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.estadoCobranzaOperacions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoCobranzaOperacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EstadoCobranzaOperacion) {
        return item.id;
    }
    registerChangeInEstadoCobranzaOperacions() {
        this.eventSubscriber = this.eventManager.subscribe('estadoCobranzaOperacionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
