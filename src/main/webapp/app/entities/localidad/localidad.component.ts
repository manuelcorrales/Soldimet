import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Localidad } from './localidad.model';
import { LocalidadService } from './localidad.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-localidad',
    templateUrl: './localidad.component.html'
})
export class LocalidadComponent implements OnInit, OnDestroy {
localidads: Localidad[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private localidadService: LocalidadService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.localidadService.query().subscribe(
            (res: ResponseWrapper) => {
                this.localidads = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLocalidads();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Localidad) {
        return item.id;
    }
    registerChangeInLocalidads() {
        this.eventSubscriber = this.eventManager.subscribe('localidadListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
