import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { EstadoOperacion } from './estado-operacion.model';
import { EstadoOperacionService } from './estado-operacion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-estado-operacion',
    templateUrl: './estado-operacion.component.html'
})
export class EstadoOperacionComponent implements OnInit, OnDestroy {
estadoOperacions: EstadoOperacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoOperacionService: EstadoOperacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.estadoOperacionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.estadoOperacions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoOperacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EstadoOperacion) {
        return item.id;
    }
    registerChangeInEstadoOperacions() {
        this.eventSubscriber = this.eventManager.subscribe('estadoOperacionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
