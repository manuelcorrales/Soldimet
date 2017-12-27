import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Aplicacion } from './aplicacion.model';
import { AplicacionService } from './aplicacion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-aplicacion',
    templateUrl: './aplicacion.component.html'
})
export class AplicacionComponent implements OnInit, OnDestroy {
aplicacions: Aplicacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private aplicacionService: AplicacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.aplicacionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.aplicacions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAplicacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Aplicacion) {
        return item.id;
    }
    registerChangeInAplicacions() {
        this.eventSubscriber = this.eventManager.subscribe('aplicacionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
