import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { CobranzaOperacion } from './cobranza-operacion.model';
import { CobranzaOperacionService } from './cobranza-operacion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-cobranza-operacion',
    templateUrl: './cobranza-operacion.component.html'
})
export class CobranzaOperacionComponent implements OnInit, OnDestroy {
cobranzaOperacions: CobranzaOperacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cobranzaOperacionService: CobranzaOperacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cobranzaOperacionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cobranzaOperacions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCobranzaOperacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CobranzaOperacion) {
        return item.id;
    }
    registerChangeInCobranzaOperacions() {
        this.eventSubscriber = this.eventManager.subscribe('cobranzaOperacionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
