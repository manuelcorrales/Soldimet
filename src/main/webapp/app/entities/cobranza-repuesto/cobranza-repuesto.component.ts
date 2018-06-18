import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { CobranzaRepuesto } from './cobranza-repuesto.model';
import { CobranzaRepuestoService } from './cobranza-repuesto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-cobranza-repuesto',
    templateUrl: './cobranza-repuesto.component.html'
})
export class CobranzaRepuestoComponent implements OnInit, OnDestroy {
cobranzaRepuestos: CobranzaRepuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cobranzaRepuestoService: CobranzaRepuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cobranzaRepuestoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cobranzaRepuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCobranzaRepuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CobranzaRepuesto) {
        return item.id;
    }
    registerChangeInCobranzaRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe('cobranzaRepuestoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
