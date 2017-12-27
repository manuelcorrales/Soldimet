import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Direccion } from './direccion.model';
import { DireccionService } from './direccion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-direccion',
    templateUrl: './direccion.component.html'
})
export class DireccionComponent implements OnInit, OnDestroy {
direccions: Direccion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private direccionService: DireccionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.direccionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.direccions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDireccions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Direccion) {
        return item.id;
    }
    registerChangeInDireccions() {
        this.eventSubscriber = this.eventManager.subscribe('direccionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
