import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { TipoRepuesto } from './tipo-repuesto.model';
import { TipoRepuestoService } from './tipo-repuesto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tipo-repuesto',
    templateUrl: './tipo-repuesto.component.html'
})
export class TipoRepuestoComponent implements OnInit, OnDestroy {
tipoRepuestos: TipoRepuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoRepuestoService: TipoRepuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tipoRepuestoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tipoRepuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoRepuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipoRepuesto) {
        return item.id;
    }
    registerChangeInTipoRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe('tipoRepuestoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
