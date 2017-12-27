import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { EstadoPersona } from './estado-persona.model';
import { EstadoPersonaService } from './estado-persona.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-estado-persona',
    templateUrl: './estado-persona.component.html'
})
export class EstadoPersonaComponent implements OnInit, OnDestroy {
estadoPersonas: EstadoPersona[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoPersonaService: EstadoPersonaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.estadoPersonaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.estadoPersonas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoPersonas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EstadoPersona) {
        return item.id;
    }
    registerChangeInEstadoPersonas() {
        this.eventSubscriber = this.eventManager.subscribe('estadoPersonaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
