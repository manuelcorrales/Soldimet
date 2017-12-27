import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Rubro } from './rubro.model';
import { RubroService } from './rubro.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-rubro',
    templateUrl: './rubro.component.html'
})
export class RubroComponent implements OnInit, OnDestroy {
rubros: Rubro[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rubroService: RubroService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rubroService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rubros = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRubros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Rubro) {
        return item.id;
    }
    registerChangeInRubros() {
        this.eventSubscriber = this.eventManager.subscribe('rubroListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
