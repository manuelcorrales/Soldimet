import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { CostoOperacion } from './costo-operacion.model';
import { CostoOperacionService } from './costo-operacion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-costo-operacion',
    templateUrl: './costo-operacion.component.html'
})
export class CostoOperacionComponent implements OnInit, OnDestroy {
costoOperacions: CostoOperacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private costoOperacionService: CostoOperacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.costoOperacionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.costoOperacions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCostoOperacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CostoOperacion) {
        return item.id;
    }
    registerChangeInCostoOperacions() {
        this.eventSubscriber = this.eventManager.subscribe('costoOperacionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
